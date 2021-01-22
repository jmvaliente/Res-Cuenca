import React, { useState } from 'react'
import { View } from 'react-native'
import AddTapaForm from '../tapas/AddTapaForm'
import Loading from '../../components/Loading'

function AddTapa(props) {

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

export default AddTapa