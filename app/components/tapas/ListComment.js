import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button, Avatar, Rating } from 'react-native-elements'
import { firebaseFn } from '../../utils/functions/firebase'

export default function ListComment(props) {

    const { navigation, idTapa, setRating } = props
    const [stateUserLogged, setUserLogged] = useState(false)
    const [comments, setComments] = useState([])

    firebaseFn.userLogged().then(result => { setUserLogged(result) })

    useEffect(() => {
        firebaseFn.getComments(idTapa, setComments)
    }, [comments])

    return (
        <View>
            {comments.map((el, index) =>
                <View key={index} style={styles.viewCommentStyle}>
                    {Comments(el)}
                </View>
            )}

            {stateUserLogged
                ? (<Button title="Añadir comentario"
                    buttonStyle={styles.btnAddComment}
                    titleStyle={styles.btnTitleAddComment}
                    icon={{
                        type: "material-community",
                        name: "square-edit-outline",
                        color: "#00a680"
                    }}
                    onPress={() => {
                        navigation.navigate("add_comments", {
                            idTapa: idTapa
                        })
                    }}
                />)
                : (
                    <Button title="Logueate para comentar"
                        buttonStyle={styles.btnAddComment}
                        titleStyle={styles.btnTitleAddComment}
                        onPress={() => navigation.navigate("login")}
                    />)}
        </View>
    )
}

function Comments(props) {
    const { avatarUser, title, rating, createAt, comment } = props
    const createCommentDate = new Date(createAt.seconds * 1000)

    return (
        <>
            <View style={styles.viewCommentAvatarStyle}>
                <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarComment}
                    source={avatarUser ? { uri: avatarUser } : require("../../../assets/img/user.png")}
                />
            </View>
            <View style={styles.viewInfoComments}>
                <Text style={styles.textTitleComment}>{title}</Text>
                <Text style={styles.textComment}>{comment}</Text>
                <Rating imageSize={15} startingValue={rating} readonly />
                <Text style={styles.reviewDateComments}>{createCommentDate.getDate()}/{createCommentDate.getMonth() + 1}/{createCommentDate.getFullYear()} {createCommentDate.getHours()}:{createCommentDate.getMinutes() < 10 ? "0" : ""}{createCommentDate.getMinutes()}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    btnAddComment: {
        backgroundColor: "transparent"
    },
    btnTitleAddComment: {
        color: "#00a680"
    },
    viewCommentStyle: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    viewCommentAvatarStyle: {
        marginRight: 15
    },
    imageAvatarComment: {
        width: 50,
        height: 50
    },
    viewInfoComments: {
        flex: 1,
        alignItems: "flex-start"
    },
    textComment: {
        fontWeight: "normal",
        paddingTop: 2,
        color: "gray",
        marginBottom: 5
    },
    textTitleComment: {
        fontWeight: "bold"
    },
    reviewDateComments: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0
    }

})
