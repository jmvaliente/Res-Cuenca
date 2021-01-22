import React from "react"
import { View, Image } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import RegisterForm from "../../components/account/RegisterForm"
import { styles } from '../../../assets/css/styles'

function Register() {
    return (
        <KeyboardAwareScrollView>
            <View>
                <Image
                    source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
                    resizeMode="contain"
                    style={styles.logoRegister}
                />
                <View style={styles.viewFormRegister}>
                    <RegisterForm />
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Register
