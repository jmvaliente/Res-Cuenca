import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Favorites from "../screens/Favorites"

const Stack = createStackNavigator();

function FavoritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="favorites"
                component={Favorites}
                options={{ title: "Platos Favoritos" }}
            />
        </Stack.Navigator>
    )
}

export default FavoritesStack