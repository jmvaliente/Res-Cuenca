import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";


import * as firebase from "firebase";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading"

function Account() {

    const [state, setState] = useState({
        login: null
    });

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            !user ? setState({ ...state, login: false }) : setState({ ...state, login: true })
        })
    }, []);

    if (state.login === null) return (<Loading isVisible={true} text="Cargando..." />);

    return state.login ? <UserLogged /> : <UserGuest />;
}

export default Account
