import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AddTapaForm from '../tapas/AddTapaForm'
import Loading from '../../components/Loading'

function AddTapa(props) {

    const { navigation } = props
    const [addTapaState, setAddTapaState] = useState({
        loading: false
    })

    return (
        <View>
            <AddTapaForm />
            <Loading isVisible={addTapaState.loading} text="añadiendo Tapa" />
        </View>
    )
}

const style = StyleSheet.create({})

export default AddTapa