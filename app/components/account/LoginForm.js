import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native"
import Loading from '../Loading'
import { styles } from '../../../assets/css/styles'

import { validateLogin } from '../../utils/validations'
import * as firebase from 'firebase'


export default function LoginForm() {

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
        <View style={styles.formContainerLoginForm}>
            <Loading isVisible={stateLogin.loading} text={"Entrando a su cuenta"} />
            <Input
                placeholder={"Correo Electrónico"}
                containerStyle={styles.inputFormLoginForm}
                onChange={e => onChange(e, "email")}
                errorMessage={stateError.error === "email" || stateError.firebase ? stateError.msg : null}
                onEndEditing={() => setStateError(validateLogin(stateLogin))}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRightLoginForm}
                    />
                }
            />
            <Input
                placeholder={"Contraseña"}
                containerStyle={styles.inputFormLoginForm}
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
                        iconStyle={styles.iconRightLoginForm}
                    />
                }
            />
            <Button
                title="Iniciar sesión"
                containerStyle={styles.btnContainerLoginLoginForm}
                buttonStyle={styles.btnLoginLoginForm}
                onPress={() => onSubmit()}

            />
        </View>
    )
}