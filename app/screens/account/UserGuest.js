import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"

function UserGuest() {
    const navigation = useNavigation()

    return (
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Image
                source={require("../../../assets/img/user-guest.jpg")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}> Consulta tu Perfil</Text>
            <Text style={styles.description}>
                ¿Como describirias el mejor pincho de la ciudad? Busca y visuzaliza los mejores
                pinchos de una forma sencilla, vota y comenta cual te ha gustado más.
            </Text>
            <View style={styles.viewBtn}>
                <Button
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    title="Ir a tu perfil"
                    onPress={() => navigation.navigate("login")}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30,
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 40,
    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center"

    },
    description: {
        textAlign: "center",
        marginBottom: 20
    },
    viewBtn: {
        display: "flex",
        flex: 1,
        alignItems: "center"
    },
    btnStyle: {
        backgroundColor: "#00a680"
    },
    btnContainer: {
        width: "70%"
    }
})

export default UserGuest