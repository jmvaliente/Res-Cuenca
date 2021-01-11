import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { AirbnbRating, Button, Input } from "react-native-elements"
import Loading from "../../components/Loading"

import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"
import "firebase/firestore"

const db = firebase.firestore(firebaseApp)

export default function AddComments(props) {
    const { navigation, route } = props
    const { idTapa } = route.params

    const [comment, setComment] = useState({
        rating: null,
        title: "",
        comment: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({
        errorStatus: false,
        msg: ""
    })

    const sendComment = function () {
        if (!comment.rating) {
            setError({ errorStatus: true, msg: "Se necesita al menos la puntuacion" })
        } else {
            setError({ errorStatus: false, msg: "" })
            setIsLoading(true)
            const user = firebase.auth().currentUser
            const payload = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idTapa: idTapa,
                title: user.displayName,
                rating: comment.rating,
                comment: comment.comment,
                createAt: new Date()
            }

            db.collection("comments")
                .add(payload)
                .then(() => {
                    updateRating()
                })
                .catch(() => {
                    setIsLoading(false)
                    setError({ ...error, msg: "No se ha podido enviar el comentario" })
                })

        }
    }

    const updateRating = function () {
        const tapaRef = db.collection("tapas").doc(idTapa)
        tapaRef.get().then((res) => {
            const tapaData = res.data()
            const ratingTotal = tapaData.ratingTotal + comment.rating
            const quantityVote = tapaData.quantityVote + 1
            const ratingResult = ratingTotal / quantityVote

            tapaRef.update({
                rating: ratingResult,
                ratingTotal,
                quantityVote
            }).then(() => {
                setIsLoading(false)
                navigation.goBack()
            })

        })
    }

    return (
        <View style={styles.viewBodyComments}>
            <View style={styles.viewRatingComments}>
                <AirbnbRating
                    count={5}
                    reviews={["Malo", "Mejorable", "Normal", "Bueno", "Excelente"]}
                    defaultRating={0}
                    size={35}
                    onFinishRating={(value) => { setComment({ ...comment, rating: value }) }}
                />
            </View>
            <View style={styles.formComments}>
                <Input
                    placeholder="Comentario"
                    errorMessage={error.msg}
                    containerStyle={styles.inputComments}
                    onChange={(e) => setComment({ ...comment, comment: e.nativeEvent.text })}
                />
                <Button
                    title="Enviar"
                    containerStyle={styles.btnContainerComments}
                    buttonStyle={styles.btnStylesComment}
                    onPress={() => sendComment()}
                />
            </View>
            <Loading isVisible={isLoading} text="Enviando Comentario" />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBodyComments: {
        flex: 1
    },
    viewRatingComments: {
        height: 110,
        backgroundColor: "#f2f2f2"
    },
    formComments: {
        flex: 1,
        alignItems: "center",
        margin: 10,
        marginTop: 40
    },
    inputComments: {
        marginBottom: 10
    },
    textComment: {
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnContainerComments: {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 20,
        marginBottom: 10,
        width: "95%"
    },
    btnStylesComment: {
        backgroundColor: "#00a680"
    }
})
