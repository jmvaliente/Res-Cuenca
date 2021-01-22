import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from 'react-native-elements'
import InfoUser from '../../components/account/InfoUser'
import * as firebase from 'firebase'
import AccountOption from '../../components/account/AccountOptions'
import { styles } from '../../../assets/css/styles'

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
        <View style={styles.viewUserInfoUserLogged}>
            {userState && <InfoUser user={userState} />}
            <AccountOption user={userState} setReload={setReload} />
            <Button
                title="Cerrar Sesión"
                buttonStyle={styles.btnLogoutUserLogged}
                onPress={() => logout()}
                titleStyle={styles.btnLogoutTextUserLogged}
            />
        </View>
    )
}

export default UserLogged