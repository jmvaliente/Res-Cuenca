import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import RankingTapas from '../components/ranking/RankingTapas'
import { firebaseApp } from '../utils/firebase'
import firebase from 'firebase/app'
import "firebase/firestore"

const db = firebase.firestore(firebaseApp)

function TopTapa(props) {

    const { navigation } = props
    const [tapas, setTapas] = useState([])

    useEffect(() => {
        db.collection("tapas")
            .orderBy("rating", "desc")
            .limit(5)
            .get()
            .then((res) => {
                const bestTapas = []
                res.forEach((doc) => {
                    const data = doc.data()
                    data.id = doc.id
                    bestTapas.push(data)
                })
                setTapas(bestTapas)
            })
    }, [])

    return (
        <View>
            <RankingTapas tapas={tapas} navigation={navigation} />
        </View>
    );
}

export default TopTapa
