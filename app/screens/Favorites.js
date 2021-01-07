import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { Image, Icon, Button } from 'react-native-elements'
import Loading from '../components/Loading'
import { useFocusEffect } from '@react-navigation/native'
import { firebaseApp } from '../utils/firebase'
import firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

function Favorites(props) {
    const { navigation } = props
    const [tapas, setTapas] = useState(null)
    const [userLogged, setUserLogged] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect(
        useCallback(() => {
            if (userLogged) {
                setIsLoading(true)
                const userId = firebase.auth().currentUser.uid
                db.collection("favorites")
                    .where("idUser", "==", userId)
                    .get()
                    .then((res) => {
                        const idTapas = []
                        res.forEach((doc) => {
                            idTapas.push(doc.data().idTapa)
                        })
                        getTapasFavorites(idTapas).then((resp) => {
                            const tapas = []
                            resp.forEach((doc) => {
                                const tapa = doc.data()
                                tapa.id = doc.id
                                tapas.push(tapa)
                            })
                            setTapas(tapas)
                            setIsLoading(false)
                        })
                    })
            }
        }, [userLogged])
    )

    function getTapasFavorites(idTapas) {
        const tapasFavorites = []
        idTapas.forEach((id) => {
            const result = db.collection("tapas").doc(id).get()
            tapasFavorites.push(result)
        })
        return Promise.all(tapasFavorites)
    }

    function tapaFavorite(props) {
        const { item: { name, images } } = props
        console.log(images)
        return (
            <View style={styles.tapaFavorite}>
                <TouchableOpacity onPress={() => console.log("tapa")}>
                    <Image
                        resizeMode="cover"
                        style={styles.favoriteImage}
                        PlaceholderContent={<ActivityIndicator color="#fff" />}
                        source={
                            images[0]
                                ? { uri: images[0] }
                                : <ActivityIndicator color="#fff" />
                        }
                    />
                    <View style={styles.infoFavorites}>
                        <Text style={styles.favoriteName}>{name}</Text>
                        <Icon
                            type="material-community"
                            name="heart"
                            containerStyle={styles.favoriteHeart}
                            onPress={() => console.log("remove")}
                            underlayColor="transparent"
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    if (isLoading) {
        return (
            <Loading isVisible={isLoading} text="Cargando favoritos" />
        )
    }

    if (!userLogged) {
        return (
            <View style={styles.styleNoFavarite}>
                <Icon
                    type="material-community"
                    name="alert-outline"
                    size={50}
                />
                <Text style={styles.textNoFavorite}>Necesitas estar registrado</Text>
                <Button
                    title="¡Registrate!"
                    containerStyle={styles.btnFavoriteRegister}
                    buttonStyle={styles.btnStyleFavoriteRegister}
                    onPress={() => navigation.navigate("account")}
                />
            </View>
        )
    }

    if (tapas?.length !== 0) {
        return (

            <View>
                <FlatList
                    data={tapas}
                    renderItem={(tapa) => tapaFavorite(tapa)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    } else {
        return (
            <View style={styles.styleNoFavarite}>
                <Icon
                    type="material-community"
                    name="alert-outline"
                    size={50}
                />
                <Text style={styles.textNoFavorite}>
                    No hay tapas favoritas. ¡Añade alguna!
                    </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    styleNoFavarite: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textNoFavorite: {
        fontSize: 15,
        fontStyle: "italic"
    },
    btnFavoriteRegister: {
        marginTop: 20,
        width: "80%"
    },
    btnStyleFavoriteRegister: {
        backgroundColor: "#00a680"
    },
    tapaFavorite: {
        margin: 10,
    },
    favoriteImage: {
        width: "100%",
        height: 180
    },
    infoFavorites: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: -30,
        backgroundColor: "#fff"
    },
    favoriteName: {
        fontWeight: "bold",
        fontSize: 15
    },
    favoriteHeart: {
        marginTop: -35,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 100
    }
})

export default Favorites
