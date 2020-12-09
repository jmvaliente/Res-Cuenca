import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Tapa(props) {
    const { navigation, route } = props
    const { id, name } = route.params

    navigation.setOptions({ title: name })

    return (
        <View>
            <Text>Tapa Detalle</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
