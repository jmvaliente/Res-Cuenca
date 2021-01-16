import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { Icon, Rating } from 'react-native-elements'
import Loading from '../../components/Loading'
import Carousel from '../../components/Carousel'
import Map from '../../components/Map'
import ListComment from '../../components/tapas/ListComment'
import { styles } from '../../../assets/css/styles'

import { useFocusEffect } from "@react-navigation/native"

import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"

const db = firebase.firestore(firebaseApp)
const screenWidth = Dimensions.get("window").width

export default function Tapa(props) {
    const { navigation, route } = props
    const { id, name } = route.params
    const [tapa, setTapa] = useState(null)
    const [loading, setLoading] = useState(false)
    const [rating, setRating] = useState(0)
    const [isFavorite, setFavorite] = useState({
        favorite: false,
        idFavorite: null
    })
    const [userLogged, setUserLogged] = useState(false)

    navigation.setOptions({ title: name })

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect(
        useCallback(() => {
            setLoading(true)
            db.collection("tapas")
                .doc(id)
                .get()
                .then(res => {
                    const data = res.data()
                    data.id = res.id
                    setTapa(data)
                    setLoading(false)
                })
        }, [])
    )

    useEffect(() => {
        if (userLogged && tapa) {
            db.collection("favorites")
                .where("idTapa", "==", tapa.id)
                .where("idUser", "==", firebase.auth().currentUser.uid)
                .get()
                .then((res) => {
                    res.forEach((doc) => {
                        if (res.docs.length === 1) {
                            setFavorite({ idFavorite: doc.id, favorite: true })
                        } else {
                            setFavorite({ ...isFavorite, favorite: false })
                        }
                    })
                })
        }
    }, [userLogged, tapa])


    function TitleRestauran({ name, rating }) {

        return (
            <View style={styles.viewTapaTitle}>
                <View style={styles.viewTapa}>
                    <Text style={styles.nameTapa}>{name}</Text>
                    <Rating style={styles.styleRating} imageSize={20} readonly="true" startingValue={rating} />
                </View>
            </View>
        )
    }

    function LocationTapa({ location, name, address }) {
        return (
            <View style={styles.viewTapaLocation}>
                <Text style={styles.tapaInfoText}>Mas Información</Text>
                <Map location={location} height={200} />
            </View>
        )
    }

    function Ingredients(tapa) {

        function ingredients({ tapa }) {

            let ingredients = []

            if (tapa.break === true) {
                ingredients.push("Pan")
            }
            if (tapa.egg === true) {
                ingredients.push("Huevo")
            }
            if (tapa.fish === true) {
                ingredients.push("Pescado")
            }
            if (tapa.meat === true) {
                ingredients.push("Carne")
            }
            if (tapa.potatoe === true) {
                ingredients.push("Patata")
            }
            if (tapa.vegetable === true) {
                ingredients.push("Vegetales")
            }

            return ingredients

        }

        return (
            <View style={styles.viewTapaTitle}>
                <Text style={styles.tapaInfoText}>Ingredientes</Text>
                <View style={styles.ingredientContainer}>
                    {ingredients(tapa).map(el => { return <Text style={styles.ingredientText}>{el}</Text> })}
                </View>
            </View>
        )
    }

    function addFavorite(favorite) {
        if (userLogged) {
            if (!favorite) {
                const payload = {
                    idUser: firebase.auth().currentUser.uid,
                    idTapa: tapa.id
                }
                db.collection("favorites")
                    .add(payload)
                    .then(() => {
                        setFavorite({ ...isFavorite, favorite: true })
                    })
                    .catch(() => {
                        setFavorite({ ...isFavorite, favorite: false })
                    })
            } else {

                db.collection("favorites")
                    .doc(isFavorite.idFavorite)
                    .delete()
                    .then(() => {
                        setFavorite({ ...isFavorite, favorite: false })
                    })
            }
        } else {
            navigation.navigate("login")
        }

    }

    if (!tapa) return <Loading isVisible={loading} text="Cargando" />
    return (
        <ScrollView vertical style={styles.viewBody}>
            <View style={styles.viewFavourite}>
                <Icon
                    type="material-community"
                    name={isFavorite.favorite ? "heart" : "heart-outline"}
                    onPress={() => addFavorite(isFavorite.favorite)}
                    color="#000"
                    size={30}
                    underlayColor="transparent"
                />
            </View>
            <Carousel
                arrayImages={tapa.images}
                height={250}
                width={screenWidth}
            />
            <TitleRestauran name={tapa.name} rating={tapa.rating} />
            <Ingredients tapa={tapa} />
            <LocationTapa location={tapa.location} address={tapa.address} />
            <ListComment navigation={navigation} idTapa={tapa.id} setRating={setRating} />

        </ScrollView>
    )
}
