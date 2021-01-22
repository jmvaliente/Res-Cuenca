import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { Card, Image, Icon, Rating } from 'react-native-elements'
import { styles } from '../../../assets/css/styles'

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
