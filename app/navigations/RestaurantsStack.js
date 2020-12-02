import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Tapas from "../screens/tapas/Tapas";

const Stack = createStackNavigator();

function TapasStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="tapas"
                component={Tapas}
                options={{ title: "Tapas" }}
            />
        </Stack.Navigator>
    )
}

export default TapasStack