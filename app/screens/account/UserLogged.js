import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from 'react-native-elements'
import InfoUser from '../../components/account/InfoUser'
import * as firebase from 'firebase'
import AccountOption from '../../components/account/AccountOptions'

function UserLogged() {

    const [userState, setUserState] = useState()
    const [reload, setReload] = useState(false)

    const logout = () => {
        firebase.auth().signOut()
    }

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser
            setUserState(user)
        })()
        setReload(false)
    }, [reload])

    return (
        <View style={styles.viewUserInfo}>
            {userState && <InfoUser user={userState} />}
            <AccountOption user={userState} setReload={setReload} />
            <Button
                title="Cerrar Sesión"
                buttonStyle={styles.btnLogout}
                onPress={() => logout()}
                titleStyle={styles.btnLogoutText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2"
    },
    btnLogout: {
        //marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnLogoutText: {
        color: "#00a680"
    }
})

export default UserLogged