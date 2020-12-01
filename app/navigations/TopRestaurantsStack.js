import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import TopRestaurants from "../screens/TopRestaurants";

const Stack = createStackNavigator();

function TopRestaurantsSlack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="top-restaurants"
                component={TopRestaurants}
                options={{ title: "Restaurantes Top" }}
            />
        </Stack.Navigator>
    )
}

export default TopRestaurantsSlack

