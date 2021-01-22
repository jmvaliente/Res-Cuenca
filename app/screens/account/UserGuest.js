import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { styles } from '../../../assets/css/styles'

function UserGuest() {
    const navigation = useNavigation()

    return (
        <ScrollView centerContent={true} style={styles.viewBodyUserGuest}>
            <Image
                source={require("../../../assets/img/user-guest.jpg")}
                resizeMode="contain"
                style={styles.imageUserGuest}
            />
            <Text style={styles.titleUserGuest}> Consulta tu Perfil</Text>
            <Text style={styles.descriptionUserGuest}>
                ¿Como describirias el mejor pincho de la ciudad? Busca y visuzaliza los mejores
                pinchos de una forma sencilla, vota y comenta cual te ha gustado más.
            </Text>
            <View style={styles.viewBtnUserGuest}>
                <Button
                    buttonStyle={styles.btnStyleUserGuest}
                    containerStyle={styles.btnContainerUserGuest}
                    title="Ir a tu perfil"
                    onPress={() => navigation.navigate("login")}
                />
            </View>
        </ScrollView>
    )
}

export default UserGuest