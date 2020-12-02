import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import * as firebase from 'firebase'
import reauthenticate from '../../utils/reauthenticate'

function EditFormUser(props) {

    const { content, user, setShowModal, setReload } = props.props

    const [dataChange, setDataChange] = useState()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState({
        error: false,
        msg: null
    })


    const onChange = (e, type) => {
        setDataChange({ ...dataChange, [type]: e.nativeEvent.text })
    }

    const onSubmit = (type) => {
        if (type === "email") {
            firebase.auth()
                .currentUser.updateEmail(dataChange.email)
                .then(() => {
                    setShowModal(false)
                    setReload(true)
                })
                .catch(() => {
                    setShowModal(false)
                    setReload(true)
                })

        }
        if (type === "password") {
            reauthenticate(dataChange.actualPassword)
                .then((el) => {
                    firebase.auth()
                        .currentUser
                        .updatePassword(dataChange.password)
                        .then(() => {
                            setShowModal(false)
                            firebase.auth().signOut()
                        })
                        .catch(() => {
                            setShowModal(false)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            (!dataChange)
                ? setError({ error: true, msg: "El campo no puede estar vacio" })
                : firebase.auth()
                    .currentUser
                    .updateProfile(dataChange)
                    .then(() => {
                        setShowModal(false)
                        setReload(true)
                    })
                    .catch(() => {
                        setShowModal(false)
                        setReload(true)
                    })
        }
    }

    switch (content.key) {
        case "displayName":
            return (
                <View style={style.view}>
                    <Input
                        placeholder={content.name}
                        containerStyle={style.input}
                        onChange={(e) => onChange(e, "displayName")}
                        errorMessage={error.msg}
                        defaultValue={user.displayName || ""}
                        rightIcon={{
                            type: "material-community",
                            name: "account-circle-outline",
                            color: "#c2c2c2"
                        }}
                    />
                    <Button
                        title="Editar"
                        containerStyle={style.btnContainer}
                        buttonStyle={style.btn}
                        onPress={() => onSubmit("displayName")}
                    />
                </View>
            )
            break;
        case "email":
            return (
                <View style={style.view}>
                    <Input
                        placeholder={content.name}
                        containerStyle={style.input}
                        onChange={(e) => onChange(e, "email")}
                        defaultValue={user.email || ""}
                        rightIcon={{
                            type: "material-community",
                            name: "at",
                            color: "#c2c2c2"
                        }}
                    />
                    <Button
                        title="Editar"
                        containerStyle={style.btnContainer}
                        buttonStyle={style.btn}
                        onPress={() => onSubmit("email")}
                    />
                </View>
            )
            break;

        case "password":
            return (
                <View style={style.view}>
                    <Input
                        placeholder={"Contraseña Actual"}
                        containerStyle={style.input}
                        onChange={(e) => onChange(e, "actualPassword")}
                        errorMessage={error.msg}
                        password={true}
                        secureTextEntry={!showPassword}
                        rightIcon={{
                            type: "material-community",
                            name: showPassword ? "eye-outline" : "eye-off-outline",
                            color: "#c2c2c2",
                            onPress: () => { setShowPassword(!showPassword) }
                        }}
                    />
                    <Input
                        placeholder={"Nueva Contraseña"}
                        containerStyle={style.input}
                        onChange={(e) => onChange(e, "password")}
                        errorMessage={error.msg}
                        password={true}
                        secureTextEntry={!showPassword}
                        rightIcon={{
                            type: "material-community",
                            name: showPassword ? "eye-outline" : "eye-off-outline",
                            color: "#c2c2c2",
                            onPress: () => { setShowPassword(!showPassword) }
                        }}
                    />
                    <Button
                        title="Editar"
                        containerStyle={style.btnContainer}
                        buttonStyle={style.btn}
                        onPress={() => onSubmit("password")}
                    />
                </View>
            )
            break;

        default:
            break;
    }
}

const style = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: "95%"
    },
    btn: {
        backgroundColor: "#00a680"
    }

})

export default EditFormUser