import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
import ListTapas from "../../components/tapas/ListTapas"
import { styles } from '../../../assets/css/styles'

const db = firebase.firestore(firebaseApp)

export default function Tapas(props) {
    const { navigation } = props
    const [user, setUser] = useState()
    const [tapas, setTapas] = useState([])
    const [totalTapas, setTotalTapas] = useState(0)
    const [startTapa, setStartTapa] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo)
        })
    }, [])

    useFocusEffect(
        useCallback(() => {
            db.collection("tapas").get().then((snap) => {
                setTotalTapas(snap.docs.length)
            })
            const resultTapas = []
            db.collection("tapas").orderBy("createAt", "desc").limit(6).get().then((res) => {
                setStartTapa(res.docs[res.docs.length - 1])
                res.forEach((doc) => {
                    const tapa = doc.data()
                    tapa.id = doc.id
                    resultTapas.push(tapa)
                })
                setTapas(resultTapas)
            })
        }, [])
    )

    const handleLoadMore = () => {
        const resultTapas = []
        tapas.length < totalTapas && setIsLoading(true)
        db.collection("tapas")
            .orderBy("createAt", "desc")
            .startAfter(startTapa.data().createAt)
            .limit(6)
            .get()
            .then((res) => {
                if (res.docs.length > 0) {
                    setStartTapa(res.docs[res.docs.length - 1])
                } else {
                    setIsLoading(false)
                }
                res.forEach((doc) => {
                    const tapa = doc.data()
                    tapa.id = doc.id
                    resultTapas.push(tapa)
                })
                setTapas([...tapas, ...resultTapas])
            })
    }

    return (
        <View style={styles.viewBodyTapas}>
            <ListTapas tapas={tapas} handleLoadMore={handleLoadMore} isLoading={isLoading} />

            {user && addItem(navigation)}
        </View>
    );
}

function addItem(navigation) {

    return <Icon
        type="material-community"
        name="plus"
        color="#00a680"
        reverse
        containerStyle={styles.btnContainerTapas}
        onPress={() => navigation.navigate("añadir_plato")}
    />
}