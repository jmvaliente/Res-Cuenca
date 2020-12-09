import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Tapas from "../screens/tapas/Tapas";
import AddTapas from "../screens/tapas/AddTapa"
import Tapa from "../screens/tapas/Tapa"

const Stack = createStackNavigator();

function TapasStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="tapas"
                component={Tapas}
                options={{ title: "Tapas" }}
            />
            <Stack.Screen
                name="añadir_plato"
                component={AddTapas}
                options={{ title: "Añadir Plato" }}
            />
            <Stack.Screen
                name="plato"
                component={Tapa}
            />
        </Stack.Navigator>
    )
}

export default TapasStack