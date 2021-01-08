import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import TopTapas from "../screens/TopTapa";

const Stack = createStackNavigator();

function TopTapaSlack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="top-Tapas"
                component={TopTapas}
                options={{ title: "Mejores Tapas" }}
            />
        </Stack.Navigator>
    )
}

export default TopTapaSlack

