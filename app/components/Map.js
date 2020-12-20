import React from 'react'
import MapView from 'react-native-maps'
import { Text } from 'react-native-elements'
import openMap from 'react-native-open-maps'

export default function map(props) {
    const { location, name, height } = props

    if (location.latitude > 0) {

        const OpenAppMap = () => {
            openMap({
                latitude: location.latitude,
                longitude: location.longitude,
                zoom: 20,
                query: name
            })
        }


        return (
            <MapView
                style={{ height: height, width: "100%" }}
                initialRegion={location}
                onPress={() => OpenAppMap()}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude
                    }}

                />

            </MapView >
        )
    }
    return (
        <Text>No hay Localizacion</Text>
    )

}
