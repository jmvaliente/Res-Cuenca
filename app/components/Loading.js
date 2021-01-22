import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";
import { styles } from '../../assets/css/styles'

export default function Loading(props) {

    const { isVisible, text } = props;

    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlayLoading}
        >
            <View style={styles.viewLoading}>
                <ActivityIndicator size="large" color="#00a680" />
                {text && <Text style={styles.textLoading}>{text}</Text>}
            </View>
        </Overlay>
    )
}

