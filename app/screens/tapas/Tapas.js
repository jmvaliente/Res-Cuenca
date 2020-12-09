import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from 'react-native-elements'
import { firebaseApp } from "../../utils/firebase"
import firebase from "firebase/app"

function Tapas(props) {
    const { navigation } = props
    const [user, setUser] = useState()

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setUser(userInfo)
        })
    }, [])

    return (
        <View style={styles.viewBody}>
            <Text>Tapas...</Text>

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
        containerStyle={styles.btnContainer}
        onPress={() => navigation.navigate("añadir_plato")}
    />
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    }
})

export default Tapas



