import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions, TimePickerAndroid } from 'react-native'
import { Icon, Avatar, Image, Input, Button, CheckBox } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import Modal from "../../components/Modal"
import MapView from 'react-native-maps'
import Loading from '../../components/Loading'
import { useNavigation } from "@react-navigation/native"

import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"

const db = firebase.firestore(firebaseApp)

const widthScreen = Dimensions.get("window").width

function AddTapaForm() {

    const navigation = useNavigation()

    const [tapaFormState, setTapaFormState] = useState({
        nameTapa: "",
        address: "",
        image: [],
        location: {},
        meat: false,
        fish: false,
        vegetable: false,
        potatoe: false,
        break: false,
        egg: false,
    })
    const [mapVisible, setMapVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {

        if (tapaFormState.image.length >= 1) {

            setLoading(true)


            const imageBlob = []

            await Promise.all(

                tapaFormState.image.map(async (image) => {
                    const resp = await fetch(image)
                    const blob = await resp.blob()
                    const ref = firebase.storage().ref("img").child(`img_${Math.random(100)}`)
                    await ref.put(blob).then(async result => {
                        await firebase
                            .storage()
                            .ref(`img/${result.metadata.name}`)
                            .getDownloadURL()
                            .then(imgUrl => { imageBlob.push(imgUrl) })
                    })
                    return imageBlob
                })
            )
            db.collection("tapas")
                .add({
                    name: tapaFormState.nameTapa,
                    address: tapaFormState.address,
                    location: tapaFormState.location,
                    images: imageBlob,
                    rating: 0,
                    ratingTotal: 0,
                    quantityVote: 0,
                    createAt: new Date(),
                    createBy: firebase.auth().currentUser.uid,
                    meat: tapaFormState.meat,
                    fish: tapaFormState.fish,
                    vegetable: tapaFormState.vegetable,
                    potatoe: tapaFormState.potatoe,
                    break: tapaFormState.break,
                    egg: tapaFormState.egg

                }).then(() => navigation.navigate("tapas"))
                .catch((err) => { console.log(err) })

            setLoading(false)
        }
        if (!tapaFormState.image.length) {
            console.log("Al menos se necesita 1 imagen")
        }

    }

    return (
        <ScrollView style={styles.ScrollView}>
            {tapaFormState.image[0] && <ImagePrincipal image={tapaFormState.image[0]} />}
            <FormAdd tapaFormState={tapaFormState} setTapaFormState={setTapaFormState} setMapVisible={setMapVisible} />
            <UploadImage tapaFormState={tapaFormState} setTapaFormState={setTapaFormState} />
            <Button
                title="Crear Tapa"
                buttonStyle={styles.btnAddTapa}
                onPress={() => onSubmit()}
            />
            <Maps mapVisible={mapVisible} setMapVisible={setMapVisible} tapaFormState={tapaFormState} setTapaFormState={setTapaFormState} />
            <Loading isVisible={loading} text="Espere" />
        </ScrollView>
    )
}

function FormAdd(props) {

    const { tapaFormState, setTapaFormState, setMapVisible } = props

    function onChange(e, type) {
        setTapaFormState({ ...tapaFormState, [type]: e.nativeEvent.text })
    }
    function onChangeBoolean(e, type) {
        setTapaFormState({ ...tapaFormState, [type]: e })
    }

    return (
        <View style={styles.formAdd}>
            <Input
                placeholder="Nombre Tapa / Plato"
                onChange={e => onChange(e, "nameTapa")}
                containerStyle={styles.input}
            />
            <Input
                placeholder="Dirección"
                onChange={e => onChange(e, "address")}
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: "#c2c2c2",
                    onPress: () => setMapVisible(true)
                }}
            />
            <Text>Ingredientes Principales</Text>
            <CheckBox
                title={"Carne"}
                onPress={() => onChangeBoolean(!tapaFormState.meat, "meat")}
                checked={tapaFormState.meat}
            />
            <CheckBox
                title={"Pescado"}
                onPress={() => onChangeBoolean(!tapaFormState.fish, "fish")}
                checked={tapaFormState.fish}
            />
            <CheckBox
                title={"Verdura"}
                onPress={() => onChangeBoolean(!tapaFormState.vegetable, "vegetable")}
                checked={tapaFormState.vegetable}
            />
            <CheckBox
                title={"Huevo"}
                onPress={() => onChangeBoolean(!tapaFormState.egg, "egg")}
                checked={tapaFormState.egg}
            />
            <CheckBox
                title={"Patata"}
                onPress={() => onChangeBoolean(!tapaFormState.potatoe, "potatoe")}
                checked={tapaFormState.potatoe}
            />
            <CheckBox
                title={"Pan"}
                onPress={() => onChangeBoolean(!tapaFormState.break, "break")}
                checked={tapaFormState.break}
            />
        </View>
    )
}

function UploadImage(props) {

    const { tapaFormState, setTapaFormState } = props

    const photoCreate = async () => {
        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA
        )
        if (resultPermission.status !== "granted") {
            console.log("Hay que aceptar los permisos para poder cargar imagenes")
        } else {
            const result = await ImagePicker.launchCameraAsync({
                aspect: [4, 3]
            }).then(result => {
                setTapaFormState({ ...tapaFormState }, tapaFormState.image.push(result.uri))
            }
            ).catch(err => console.log(err)
            )

        }
    }

    const photoDelete = (image) => {
        Alert.alert("¿Eliminar imagen?", "¿Quieres eliminar esta imagen?", [
            {
                text: "Cancelar"
            },
            {
                text: "Eliminar",
                onPress: () => deleteAction()
            }
        ], { cancelable: false })

        function deleteAction() {

            tapaFormState.image.filter((imageUrl, i) => {
                if (imageUrl === image)
                    tapaFormState.image.splice(i, 1)
            })

            setTapaFormState({ ...tapaFormState })
        }

    }



    return (
        <View style={styles.viewImage}>
            {tapaFormState.image.length <= 3 &&
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={() => { photoCreate() }}
                />
            }
            {tapaFormState.image.map((image, index) => {
                return (
                    <Avatar
                        key={index}
                        style={styles.miniImage}
                        source={{ uri: image }}
                        onLongPress={() => photoDelete(image)}
                    />
                )
            })}
        </View>
    )
}

function ImagePrincipal(props) {
    const { image } = props

    return (
        <View style={styles.viewImagePrincipal}>
            <Image
                source={{ uri: image }}
                style={{ width: widthScreen, height: 200 }}
            />
        </View>
    )

}

function Maps(props) {
    const { mapVisible, setMapVisible, tapaFormState, setTapaFormState } = props
    const [location, setLocation] = useState({})

    useEffect(() => {
        (async () => {
            const resultPermission = await Permissions.askAsync(Permissions.LOCATION)
            const statusPermissions = resultPermission.permissions.location.status

            if (statusPermissions === "granted") {
                const localitation = await Location.getCurrentPositionAsync({})
                setLocation({
                    latitude: localitation.coords.latitude,
                    longitude: localitation.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }
        })()
    }, [])

    const saveLocation = () => {
        console.log(location)
        setTapaFormState({ ...tapaFormState, location: location })
        console.log(tapaFormState)
        setMapVisible(false)

    }

    return (
        <Modal isVisible={mapVisible} setIsVisible={setMapVisible}>
            <View>
                {location && (
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => { setLocation(region) }}
                        onPoiClick={(e) => console.log(e)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            Marker
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar"
                        containerStyle={styles.viewMapBtnSaveContainer}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={() => { saveLocation(location) }}
                    />
                    <Button
                        title="Cancelar"
                        containerStyle={styles.viewMapBtnCancelContainer}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => { setMapVisible(false) }}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    ScrollView: {
        height: "100%"
    },
    formAdd: {
        marginLeft: 10,
        marginRight: 10
    },
    input: {
        marginBottom: 10

    },
    textArea: {
        height: 100,
        padding: 0,
        margin: 0,
        width: "100%"
    },
    btnAddTapa: {
        backgroundColor: "#00a680",
        margin: 20
    },
    viewImage: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20

    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniImage: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewImagePrincipal: {
        alignItems: "center",
        height: 200,
        marginBottom: 20,
        margin: 20
    },
    mapStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainer: {
        paddingLeft: 5
    },
    viewMapBtnSave: {
        backgroundColor: "#00a680"
    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d"
    },
    viewMapBtnCancelContainer: {
        paddingLeft: 5
    },
    viewMapBtnSaveContainer: {
        paddingRight: 5
    }
})

export default AddTapaForm