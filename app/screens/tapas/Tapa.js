import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import { Rating } from 'react-native-elements'
import Loading from '../../components/Loading'
import Carousel from '../../components/Carousel'
import Map from '../../components/Map'
import ListComment from '../../components/tapas/ListComment'

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

    navigation.setOptions({ title: name })

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

    if (!tapa) return <Loading isVisible={loading} text="Cargando" />
    return (
        <ScrollView vertical style={styles.viewBody}>

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

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewTapaTitle: {
        padding: 15
    },
    viewTapa: {
        flexDirection: "row"
    },
    nameTapa: {
        fontSize: 20,
        fontWeight: "bold"

    },
    styleRating: {
        position: "absolute",
        right: 0
    },
    viewTapaLocation: {
        marginTop: 10,
        paddingLeft: 15
    },
    tapaInfoText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    ingredientText: {
        fontSize: 15,
        marginRight: 15
    },
    ingredientContainer: {
        flexDirection: "row"
    }
})
