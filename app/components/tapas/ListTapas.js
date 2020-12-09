import React from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, ActivityIndicatorComponent } from 'react-native'
import { Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function ListTapas(props) {

    const { tapas, handleLoadMore, isLoading } = props
    const navigation = useNavigation()
    return (
        <View>
            {tapas.length > 0 ?
                (<FlatList
                    data={tapas}
                    renderItem={(tapa) => <Tapa tapa={tapa} navigation={navigation} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={<FooterList isLoading={isLoading} />}
                    onEndReached={handleLoadMore}

                />)
                :
                (<View style={styles.loaderTapas}>
                    <ActivityIndicator size="large" />
                    <Text>Cargando...</Text>
                </View>)}
        </View>
    )
}

function Tapa(props) {
    const { tapa, navigation } = props
    const { id, images, name, address } = tapa.item
    const imageTapa = images[0]

    return (
        <TouchableOpacity onPress={() => navigation.navigate("plato", { id, name })}>
            <View style={styles.viewTapa}>
                <View style={styles.viewTapaImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="fff" />}
                        source={imageTapa ? { uri: imageTapa } : require("../../../assets/img/image_upload.gif")}
                        style={styles.viewImage}
                    />
                </View>
                <View>
                    <Text style={styles.tapaName}>{name}</Text>
                    <Text style={styles.tapaAddress}>{address}</Text>
                    <View style={styles.ingredientsContainer}>
                        <Text>Ingredientes:</Text>
                        {ingredients(tapa.item)}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function ingredients(tapa) {

    let ingredients = []

    if (tapa.break === true) {
        ingredients.push("Pan")
    }
    if (tapa.egg === true) {
        ingredients.push("Huevo")
    }
    if (tapa.fish === true) {
        ingredients.push("Pescado")
    }
    if (tapa.meat === true) {
        ingredients.push("Carne")
    }
    if (tapa.potatoe === true) {
        ingredients.push("Patata")
    }
    if (tapa.vegetable === true) {
        ingredients.push("Vegetales")
    }

    return <Text style={styles.ingredientsText}>{ingredients.join(", ")}</Text>

}

function FooterList(props) {
    const { isLoading } = props

    if (isLoading) {

        return (
            <View style={styles.loaderTapas}>
                <ActivityIndicator size="large" />
            </View>
        )
    } else {
        return (
            <View style={styles.notFoundTapas}>
                <Text>No quedan tapas para mostar</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loaderTapas: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    viewTapa: {
        flexDirection: "row",
        margin: 10
    },
    viewTapaImage: {
        marginRight: 15
    },
    viewImage: {
        width: 100,
        height: 100
    },
    tapaName: {
        fontWeight: "bold"
    },
    tapaAddress: {
        paddingTop: 2,
        color: "grey"
    },
    notFoundTapas: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center"
    },
    ingredientsContainer: {
        flexDirection: "column"
    },
    ingredientsText: {
        marginRight: 2,
        fontWeight: "bold"
    }

})
