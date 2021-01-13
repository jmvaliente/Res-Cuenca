import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { AirbnbRating, Button, Input } from "react-native-elements"
import Loading from "../../components/Loading"
import { firebaseFn } from '../../utils/functions/firebase'

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
            const user = firebaseFn.getUser()
            const payload = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idTapa: idTapa,
                title: user.displayName,
                rating: comment.rating,
                comment: comment.comment,
                createAt: new Date()
            }
            firebaseFn.postComment(payload, setIsLoading, setError)
            firebaseFn.updateRating(idTapa, comment, setIsLoading, navigation)
        }
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
