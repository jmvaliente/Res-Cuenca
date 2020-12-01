import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import Modal from '../../components/Modal'
import EditFormUser from '../account/EditFormUser'

function AccountOption(props) {

    const { user, setReload } = props

    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState({
        name: "",
        key: ""

    })
    const menuOption = generateOptions()

    function editAction(key) {
        switch (key) {
            case "name":
                setContentModal({ ...contentModal, name: "Editar Nombre", key: "displayName" })
                setShowModal(true)
                break;
            case "pass":
                setContentModal({ ...contentModal, name: "Editar Contraseña", key: "password" })
                setShowModal(true)
                break;
            case "email":
                setContentModal({ ...contentModal, name: "Editar Email", key: "email" })
                setShowModal(true)
                break;
            default:
                setContentModal({ ...contentModal })
                setShowModal(false)
                break;
        }
    }

    return (
        <View>
            {menuOption.map((option, index) => (

                < ListItem key={index} bottomDivider containerStyle={styles.menuItemStyles} onPress={() => editAction(option.key)} >
                    <Icon type={option.iconType} name={option.iconNameLeft} />
                    <ListItem.Title>{option.tittle}</ListItem.Title>
                </ListItem>
            ))}
            <Modal isVisible={showModal} setIsVisible={setShowModal} >
                <>
                    <Text>{contentModal.name}</Text>
                    <EditFormUser props={{ user: user, content: contentModal, setShowModal, setReload }} />
                </>
            </Modal>
        </View>
    )
}

function generateOptions() {
    return [
        {
            tittle: "Cambiar Nombre",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            key: "name"
        },
        {
            tittle: "Cambiar Contraseña",
            iconType: "material-community",
            iconNameLeft: "lock",
            iconColorLeft: "#ccc",
            key: "pass"
        },
        {
            tittle: "Cambiar email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            key: "email"
        }
    ]
}

const styles = StyleSheet.create({
    menuItemStyles: {
        borderBottomWidth: 2,
        borderBottomColor: "#e3e3e3"
    }

})

export default AccountOption