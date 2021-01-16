import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewTapaTitle: {
        padding: 15
    },
    viewTapa: {
        flexDirection: "row"
    },
    nameTapa: {
        fontSize: 20,
        fontWeight: "bold"

    },
    styleRating: {
        position: "absolute",
        right: 0
    },
    viewTapaLocation: {
        marginTop: 10,
        paddingLeft: 15
    },
    tapaInfoText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    ingredientText: {
        fontSize: 15,
        marginRight: 15
    },
    ingredientContainer: {
        flexDirection: "row"
    },
    viewFavourite: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 5,
        paddingLeft: 15
    },
    loaderTapas: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    viewTapa: {
        flexDirection: "row",
        margin: 10
    },
    viewTapaImage: {
        marginRight: 15
    },
    viewImage: {
        width: 100,
        height: 100
    },
    tapaName: {
        fontWeight: "bold"
    },
    tapaAddress: {
        paddingTop: 2,
        color: "grey"
    },
    notFoundTapas: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center"
    },
    ingredientsContainer: {
        flexDirection: "column"
    },
    ingredientsText: {
        marginRight: 2,
        fontWeight: "bold"
    },
    //Loading Modal
    overlayLoading: {
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#00a680",
        borderWidth: 2,
        borderRadius: 10
    },
    viewLoading: {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textLoading: {
        color: "#00a680",
        textTransform: "uppercase",
        marginTop: 10
    },
    // Modal
    overlayModal: {
        height: "auto",
        width: "90%",
        backgroundColor: "#fff"
    },
    //add Comments
    viewBodyComments: {
        flex: 1
    },
    viewRatingComments: {
        height: 110,
        backgroundColor: "#f2f2f2"
    },
    formComments: {
        flex: 1,
        alignItems: "center",
        margin: 10,
        marginTop: 40
    },
    inputComments: {
        marginBottom: 10
    },
    textComment: {
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0
    },
    btnContainerComments: {
        flex: 1,
        justifyContent: "flex-end",
        marginTop: 20,
        marginBottom: 10,
        width: "95%"
    },
    btnStylesComment: {
        backgroundColor: "#00a680"
    },
    //Tapas
    viewBodyTapas: {
        flex: 1,
        backgroundColor: "#fff"
    },
    btnContainerTapas: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    }
    // Favorite list
    styleNoFavarite: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    textNoFavorite: {
        fontSize: 15,
        fontStyle: "italic"
    },
    btnFavoriteRegister: {
        marginTop: 20,
        width: "80%"
    },
    btnStyleFavoriteRegister: {
        backgroundColor: "#00a680"
    },
    tapaFavorite: {
        margin: 10,
    },
    favoriteImage: {
        width: "100%",
        height: 180
    },
    infoFavorites: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: -30,
        backgroundColor: "#fff"
    },
    favoriteName: {
        fontWeight: "bold",
        fontSize: 15
    },
    favorite: {
        marginTop: -35,
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 100
    }
})