import React, { useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import { Input, Icon, Button } from "react-native-elements"
import * as firebase from "firebase"
import { useNavigation } from "@react-navigation/native"
import Loading from '../Loading'

import { validateData } from "../../utils/validations"

function RegisterForm() {

    const navigation = useNavigation()

    const [state, setState] = useState({
        passwordIcon: false,
        confirmPassIcon: false,
        email: "",
        password: "",
        confirmPass: "",
        loading: false
    })

    const [error, setError] = useState({
        error: null,
        msg: null,
        firebase: null
    })

    const onSubmit = () => {
        setState({ ...state, loading: true })

        setError(validateData(state))
        if (error.validate) firebase.auth()
            .createUserWithEmailAndPassword(state.email, state.password)
            .then(res => {
                setState({ ...state, loading: false })
                navigation.navigate("account")
            })
            .catch(err => {
                setError({ ...error, msg: "Este email ya esta registrado", firebase: true })
            })

    }

    const onChange = (e, type) => {
        setState({ ...state, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.formContainer}>
            <Loading isVisible={state.loading} text="Creando Cuenta" />
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "email")}
                onEndEditing={() => setError(validateData(state))}
                errorMessage={error.error === "email" || error.firebase ? error.msg : null}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "password")}
                onEndEditing={() => setError(validateData(state))}
                errorMessage={error.error === "password" ? error.msg : null}
                password={true}
                secureTextEntry={!state.passwordIcon}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={state.passwordIcon ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setState({ ...state, passwordIcon: !state.passwordIcon })}
                    />
                }
            />
            <Input
                placeholder="Repetir Contraseña"
                containerStyle={styles.inputForm}
                onChange={e => onChange(e, "confirmPass")}
                onEndEditing={() => setError(validateData(state))}
                errorMessage={error.error === "confirmPass" ? error.msg : null}
                password={true}
                secureTextEntry={!state.confirmPassIcon}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={state.confirmPassIcon ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setState({ ...state, confirmPassIcon: !state.confirmPassIcon })}
                    />
                }
            />
            <Button
                title="Registro"
                onPress={() => onSubmit()}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnRegister}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    btnContainer: {
        marginTop: 10,
        width: "95%"
    },
    btnRegister: {
        backgroundColor: "#00a680"
    },
    iconRight: {
        color: "#c1c1c1"
    }

})

export default RegisterForm