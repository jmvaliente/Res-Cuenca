import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { styles } from '../../../assets/css/styles'

import LoginForm from "../../components/account/LoginForm"

function Login() {

    return (
        <ScrollView>
            <Image
                source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                resizeMode="contain"
                style={styles.logoLogin}
            />
            <View style={styles.viewContainerLogin}>
                <LoginForm />
                <CreateAccount />
                <Divider style={styles.dividerLogin} />
                <Text>Social Login</Text>
            </View>
        </ScrollView>

    )
}

function CreateAccount(props) {

    const navigation = useNavigation()

    return (
        <Text style={styles.textRegisterLogin}>
            ¿No tienes Cuenta?{" "}
            <Text style={styles.btnRegisterLogin} onPress={() => navigation.navigate("register")}>
                Regístrate
            </Text>
        </Text>
    )
}

export default Login