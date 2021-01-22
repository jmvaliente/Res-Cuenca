import React, { useState } from "react"
import { View } from "react-native"
import { Input, Icon, Button } from "react-native-elements"
import * as firebase from "firebase"
import { useNavigation } from "@react-navigation/native"
import Loading from '../Loading'
import { styles } from '../../../assets/css/styles'

import { validateData } from "../../utils/validations"

export default function RegisterForm() {

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
        <View style={styles.formContainerRegisterForm}>
            <Loading isVisible={state.loading} text="Creando Cuenta" />
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.inputFormRegisterForm}
                onChange={e => onChange(e, "email")}
                onEndEditing={() => setError(validateData(state))}
                errorMessage={error.error === "email" || error.firebase ? error.msg : null}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRightRegisterForm}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputFormRegisterForm}
                onChange={e => onChange(e, "password")}
                onEndEditing={() => setError(validateData(state))}
                errorMessage={error.error === "password" ? error.msg : null}
                password={true}
                secureTextEntry={!state.passwordIcon}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={state.passwordIcon ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRightRegisterForm}
                        onPress={() => setState({ ...state, passwordIcon: !state.passwordIcon })}
                    />
                }
            />
            <Input
                placeholder="Repetir Contraseña"
                containerStyle={styles.inputFormRegisterForm}
                onChange={e => onChange(e, "confirmPass")}
                onEndEditing={() => setError(validateData(state))}
                errorMessage={error.error === "confirmPass" ? error.msg : null}
                password={true}
                secureTextEntry={!state.confirmPassIcon}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={state.confirmPassIcon ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRightRegisterForm}
                        onPress={() => setState({ ...state, confirmPassIcon: !state.confirmPassIcon })}
                    />
                }
            />
            <Button
                title="Registro"
                onPress={() => onSubmit()}
                containerStyle={styles.btnContainerRegisterForm}
                buttonStyle={styles.btnRegisterRegisterForm}
            />
        </View>
    )
}