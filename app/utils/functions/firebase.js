import { firebaseApp } from '../firebase'
import firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const firebaseFn = {

    userLogged: async function () {
        let result = false
        await firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                result = true
            } else {
                resutl = false
            }
        })
        return result
    },

    getUserId: function () {
        return firebase.auth().currentUser.uid || false
    },

    getUser: function () {
        return firebase.auth().currentUser
    },

    getFavorites: function (idTapas) {
        const tapasFavorites = []
        idTapas.forEach((id) => {
            const result = db.collection("tapas").doc(id).get()
            tapasFavorites.push(result)
        })
        return Promise.all(tapasFavorites)
    },

    deleteFavorite: function (id, setReload) {
        setReload(true)
        db.collection("favorites")
            .where("idTapa", "==", id)
            .where("idUser", "==", firebaseFn.getUserId())
            .get()
            .then((res) => {
                res.forEach((doc) => {
                    const idFavorite = doc.id
                    db.collection("favorites")
                        .doc(idFavorite)
                        .delete()
                        .then(() => {
                            setReload(false)
                        })
                })
            })
    },

    listFavoritesUser: function (setIsLoading, setTapas) {
        setIsLoading(true)
        db.collection("favorites")
            .where("idUser", "==", firebaseFn.getUserId())
            .get()
            .then((res) => {
                const idTapas = []
                res.forEach((doc) => {
                    idTapas.push(doc.data().idTapa)
                })
                firebaseFn.getFavorites(idTapas).then((resp) => {
                    const tapas = []
                    resp.forEach((doc) => {
                        const tapa = doc.data()
                        tapa.id = doc.id
                        tapas.push(tapa)
                    })
                    setTapas(tapas)
                    setIsLoading(false)
                })
            })
    },

    getComments: function (idTapa, setComments) {
        db.collection("comments")
            .where("idTapa", "==", idTapa)
            .get()
            .then((res) => {
                const initialComments = []
                res.forEach((el) => {
                    initialComments.push(el.data())
                })
                setComments(initialComments)
            })
    },

    postComment: function (payload, setIsLoading, setError) {
        db.collection("comments")
            .add(payload)
            .then(() => {
                setIsLoading(false)
            })
            .catch(() => {
                setIsLoading(false)
                setError({ ...error, msg: "No se ha podido enviar el comentario" })
            })
    },

    updateRating: function (idTapa, comment, setIsLoading, navigation) {
        const tapaRef = db.collection("tapas").doc(idTapa)
        tapaRef.get().then((res) => {
            const tapaData = res.data()
            const ratingTotal = tapaData.ratingTotal + comment.rating
            const quantityVote = tapaData.quantityVote + 1
            const ratingResult = ratingTotal / quantityVote
            tapaRef.update({
                rating: ratingResult,
                ratingTotal,
                quantityVote
            }).then(() => {
                setIsLoading(false)
                navigation.goBack()
            }).catch(() => {
                setIsLoading(false)
            })

        })
    }

}