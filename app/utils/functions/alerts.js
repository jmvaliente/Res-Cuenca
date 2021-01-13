import { Alert } from "react-native";
import { firebaseFn } from '../functions/firebase'


export const alerts = {
    alertDeleteFavorites: function deleteFavoriteAlert(id, setReload, title, desc) {
        Alert.alert(
            title || "Eliminar Tapa de Favoritos",
            desc || "",
            [
                {
                    text: title ? "" : "Cancelar",
                    style: "cancel"
                }
                ,
                {
                    text: title ? "" : "Eliminar",
                    onPress: title ? "" : () => firebaseFn.deleteFavorite(id, setReload)
                }
            ],
            { cancelable: false }
        )
    }
}