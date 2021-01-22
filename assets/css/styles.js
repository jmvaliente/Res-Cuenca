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
    },
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
    },
    // Login
    logoLogin: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewContainerLogin: {
        marginRight: 40,
        marginLeft: 40
    },
    textRegisterLogin: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    btnRegisterLogin: {
        color: "#00a680",
        fontWeight: "bold"
    },
    dividerLogin: {
        backgroundColor: "#00a680",
        margin: 40
    },
    // Register
    logoRegister: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    viewFormRegister: {
        marginRight: 40,
        marginLeft: 40
    },
    // UserGuest
    viewBodyUserGuest: {
        marginLeft: 30,
        marginRight: 30,
    },
    imageUserGuest: {
        height: 300,
        width: "100%",
        marginBottom: 40,
    },
    titleUserGuest: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center"

    },
    descriptionUserGuest: {
        textAlign: "center",
        marginBottom: 20
    },
    viewBtnUserGuest: {
        display: "flex",
        flex: 1,
        alignItems: "center"
    },
    btnStyleUserGuest: {
        backgroundColor: "#00a680"
    },
    btnContainerUserGuest: {
        width: "70%"
    },
    // UserLogged
    viewUserInfoUserLogged: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2"
    },
    btnLogoutUserLogged: {
        //marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnLogoutTextUserLogged: {
        color: "#00a680"
    },
    //AddTapaForm
    ScrollViewAddTapaForm: {
        height: "100%"
    },
    formAddAddTapaForm: {
        marginLeft: 10,
        marginRight: 10
    },
    inputAddTapaForm: {
        marginBottom: 10

    },
    textAreaAddTapaForm: {
        height: 100,
        padding: 0,
        margin: 0,
        width: "100%"
    },
    btnAddTapaAddTapaForm: {
        backgroundColor: "#00a680",
        margin: 20
    },
    viewImageAddTapaForm: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20

    },
    containerIconAddTapaForm: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniImageAddTapaForm: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewImagePrincipalAddTapaForm: {
        alignItems: "center",
        height: 200,
        marginBottom: 20,
        margin: 20
    },
    mapStyleAddTapaForm: {
        width: "100%",
        height: 550
    },
    viewMapBtnAddTapaForm: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerAddTapaForm: {
        paddingLeft: 5
    },
    viewMapBtnSaveAddTapaForm: {
        backgroundColor: "#00a680"
    },
    viewMapBtnCancelAddTapaForm: {
        backgroundColor: "#a60d0d"
    },
    viewMapBtnCancelContainerAddTapaForm: {
        paddingLeft: 5
    },
    viewMapBtnSaveContainerAddTapaForm: {
        paddingRight: 5
    },
    //Search
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
    //ListComments
    btnAddComment: {
        backgroundColor: "transparent"
    },
    btnTitleAddComment: {
        color: "#00a680"
    },
    viewCommentStyle: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    viewCommentAvatarStyle: {
        marginRight: 15
    },
    imageAvatarComment: {
        width: 50,
        height: 50
    },
    viewInfoComments: {
        flex: 1,
        alignItems: "flex-start"
    },
    textComment: {
        fontWeight: "normal",
        paddingTop: 2,
        color: "gray",
        marginBottom: 5
    },
    textTitleComment: {
        fontWeight: "bold"
    },
    reviewDateComments: {
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0
    },
    // Ranking
    containerCardRanking: {
        marginBottom: 30,
        borderWidth: 0
    },
    containerIconRanking: {
        position: "absolute",
        top: -30,
        left: -30,
        zIndex: 1
    },
    imageRanking: {
        width: "100%",
        height: 200
    },
    descriptionRanking: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "space-between"
    },
    tittleRanking: {
        fontSize: 20,
        fontWeight: "bold"
    },
    descriptionRankingSecond: {
        flexDirection: "row",
        marginTop: 10,
        justifyContent: "flex-end"
    },
    // Register Form
    formContainerRegisterForm: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputFormRegisterForm: {
        width: "100%",
        marginTop: 20
    },
    btnContainerRegisterForm: {
        marginTop: 10,
        width: "95%"
    },
    btnRegisterRegisterForm: {
        backgroundColor: "#00a680"
    },
    iconRightRegisterForm: {
        color: "#c1c1c1"
    },
    //LoginForm
    formContainerLoginForm: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputFormLoginForm: {
        width: "100%",
        marginTop: 20
    },
    btnContainerLoginLoginForm: {
        marginTop: 20,
        width: "95%"
    },
    btnLoginLoginForm: {
        backgroundColor: "#00a680"
    },
    iconRightLoginForm: {

    },
    //infoUser
    viewUserInfoInfoUser: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatarInfoUser: {
        marginRight: 20,
        backgroundColor: "grey"
    },
    displayNameInfoUser: {
        fontWeight: "bold",
        paddingBottom: 5
    },
    //EditFormUser
    viewEditUser: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    inputEditUser: {
        marginBottom: 10
    },
    btnContainerEditUser: {
        marginTop: 20,
        width: "95%"
    },
    btnEditUser: {
        backgroundColor: "#00a680"
    },
    // AccountOptions
    menuItemStylesAccountOptions: {
        borderBottomWidth: 2,
        borderBottomColor: "#e3e3e3"
    }
})