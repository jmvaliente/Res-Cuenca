import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBEVQza8wvZ2xEmNmIPuiQnvi5UFNbJv0I",
    authDomain: "rest-cuenca.firebaseapp.com",
    databaseURL: "https://rest-cuenca.firebaseio.com",
    projectId: "rest-cuenca",
    storageBucket: "rest-cuenca.appspot.com",
    messagingSenderId: "636860599430",
    appId: "1:636860599430:web:3f2619648c6d3a92e89507"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)
