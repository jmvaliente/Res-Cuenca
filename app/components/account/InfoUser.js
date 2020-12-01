import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Avatar, Accessory } from 'react-native-elements'

import * as firebase from "firebase"
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

function InfoUser(props) {

    const { email, displayName, photoURL, uid } = props.user

    const [changeState, setChangeState] = useState(true)

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status
        if (resultPermissionCamera === "granted") {
            const image = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })
            if (!image.cancelled) {
                uploadImage(image.uri)
                    .then(() => {
                        setChangeState(false)
                        updateImage()
                    })
                    .catch(() => {

                    })
            }
        }
    }

    const uploadImage = async (uri) => {
        const response = await fetch(uri)
        const blob = await response.blob()
        const ref = firebase.storage().ref().child(`avatar/avatar_${uid}`)
        return ref.put(blob)
    }

    const updateImage = () => {
        firebase.storage()
            .ref(`avatar/avatar_${uid}`)
            .getDownloadURL()
            .then(async res => {
                const updateImage = {
                    photoURL: res
                }
                await firebase.auth().currentUser.updateProfile(updateImage)
                setChangeState(true)
            })
            .catch(() => {
                setChangeState(true)
            })
    }

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                title={displayName ? displayName.split("")[0] : ""}
                icon={!displayName && { name: 'home' }}
                activeOpacity={0.7}
                size="large"
                showEditButton
                source={photoURL ? { uri: photoURL } : {}}
                containerStyle={styles.userInfoAvatar}
            >
                {changeState && <Accessory size={25} onPress={() => changeAvatar()} />}
            </Avatar>
            <View>
                <Text style={styles.displayName}>{displayName}</Text>
                <Text>{email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20,
        backgroundColor: "grey"
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    }
})

export default InfoUser