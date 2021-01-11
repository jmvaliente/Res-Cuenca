import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements"
import { FireSQL } from "firesql"
import firebase from "firebase/app"

const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" })

function Search(props) {

    const { navigation } = props
    const [search, setSearch] = useState("")
    const [tapas, setTapas] = useState([])

    useEffect(() => {
        if (search) {
            fireSQL.query(`SELECT * FROM tapas WHERE name LIKE '${search}%'`)
                .then((res) => {
                    setTapas(res)
                })
        }
    }, [search])

    function Result() {
        if (!search || tapas.length === 0) {
            return (
                <View style={styles.searchWait}>
                    <Icon
                        type="material-community"
                        name="alert-outline"
                        size={50}
                    />
                    <Text style={styles.textSearch}>
                        No se ha encontrado ninguna Tapa
                    </Text>
                </View>

            )
        } else {
            return (
                <View>
                    <FlatList
                        data={tapas}
                        renderItem={(tapas) => <Tapas tapas={tapas} navigation={navigation} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )
        }
    }

    function Tapas(props) {
        const { tapas: { item }, navigation } = props
        const { name, id, images } = item
        return (
            <ListItem
                title={name}
                leftAvatar={{
                    source: { uri: images[0] }
                }}
                rightIcon={<Icon type="material-community" name="chevron-right" />}
                onPress={() => navigation.navigate("tapas", { screen: "plato", params: { id: id, name: name } })}
            />
        )
    }

    return (
        <View>
            <SearchBar
                placeholder="Buscador"
                onChangeText={e => setSearch(e)}
                containerStyle={styles.searchBar}
                value={search}
            />
            <Result />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 20,
        width: "100%"
    },
    searchWait: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    textSearch: {
        fontSize: 15,
        fontStyle: "italic",
        marginTop: 10
    },

})

export default Search
