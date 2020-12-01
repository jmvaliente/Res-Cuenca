import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native"
import Loading from '../Loading'

import { validateLogin } from '../../utils/validations'
import * as firebase from 'firebase'


function LoginForm() {

    const navigation = useNavigation()

    const [stateLogin, setStateLogin] = useState({
        email: "",
        password: "",
        passwordVisible: false,
        loading: false
    })

    const [stateError, setStateError] = useState({
        error: null,
        msg: null,
        validate: false
    })

    const onChange = (e, type) => {
        setStateLogin({ ...stateLogin, [type]: e.nativeEvent.text })
    }

    const onSubmit = () => {

        setStateLogin({ ...stateLogin, loading: true })
        firebase.auth()
            .signInWithEmailAndPassword(stateLogin.email, stateLogin.password)
            .then((res) => {
                setStateLogin({ ...stateLogin, loading: false })
                navigation.navigate("account")
            })
            .catch(err => {
                console.log(err)
                setStateLogin({ ...stateLogin, loading: false })
                setStateError({ ...stateError, msg: "Error en la autenticacion", firebase: true })
            })
    }


    return (
        <View style={styles.formContainer}>
            <Loading isVisible={stateLogin.loading} text={"Entrando a su cuenta"} />
            <Input
                placeholder={"Correo Electrónico"}
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "email")}
                errorMessage={stateError.error === "email" || stateError.firebase ? stateError.msg : null}
                onEndEditing={() => setStateError(validateLogin(stateLogin))}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder={"Contraseña"}
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "password")}
                password={true}
                secureTextEntry={!stateLogin.passwordVisible}
                errorMessage={stateError.error === "password" || stateError.firebase ? stateError.msg : null}
                onEndEditing={() => setStateError(validateLogin(stateLogin))}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={stateLogin.passwordVisible ? "eye-off-outline" : "eye-outline"}
                        onPress={() => setStateLogin({ ...stateLogin, passwordVisible: !stateLogin.passwordVisible })}
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Button
                title="Iniciar sesión"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={() => onSubmit()}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    btnContainerLogin: {
        marginTop: 20,
        width: "95%"
    },
    btnLogin: {
        backgroundColor: "#00a680"
    },
    iconRight: {

    }
})

export default LoginForm