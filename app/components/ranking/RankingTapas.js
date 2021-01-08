import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Card, Image, Icon, Rating } from 'react-native-elements'

export default function RankingTapas(props) {
    const { tapas, navigation } = props

    return (
        <FlatList
            data={tapas}
            renderItem={(tapa) => <Tapa tapa={tapa} navigation={navigation} />}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

function Tapa(props) {
    const { navigation, tapa: { index, item: { name, images, rating, quantityVote, id } } } = props
    const colorRanking = ["#efb819", "#e3e4e5", "#cd7f32"]

    return (
        <TouchableOpacity onPress={() => navigation.navigate("tapas", { screen: "plato", params: { id: id, name: name } })}>
            <Card containerStyle={styles.containerCardRanking}>
                <Icon
                    type="material-community"
                    name="chess-queen"
                    color={colorRanking[index] || "#000"}
                    size={40}
                    containerStyle={styles.containerIconRanking}
                />
                <Image
                    style={styles.imageRanking}
                    resizeMode="cover"
                    source={{ uri: images[0] }}
                />
                <View style={styles.descriptionRanking}>
                    <Text style={styles.tittleRanking}>{name}</Text>
                    <Rating
                        imageSize={20}
                        startingValue={rating}
                        readonly
                    />
                </View>
                <View style={styles.descriptionRankingSecond}>
                    <Text style={styles.tittleRanking}>Votos: {quantityVote}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerCardRanking: {
        marginBottom: 30,
        borderWidth: 0
    },
    containerIconRanking: {
        position: "absolute",
        top: -30,
        left: -30,
        zIndex: 1
    },
    imageRanking: {
        width: "100%",
        height: 200
    },
    descriptionRanking: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between"
    },
    tittleRanking: {
        fontSize: 20,
        fontWeight: "bold"
    },
    descriptionRankingSecond: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "flex-end"
    }
})
