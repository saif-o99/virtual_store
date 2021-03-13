import * as firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

let config;

    config = {
        apiKey: "AIzaSyDcoYLWZPL8hb6uMiiZsOGcskGx3ile96o",
        authDomain: "virtualstore-65cac.firebaseapp.com",
        projectId: "virtualstore-65cac",
        storageBucket: "virtualstore-65cac.appspot.com",
        messagingSenderId: "173910946247",
        appId: "1:173910946247:web:204cd2d75b9729372e29e2",
        measurementId: "G-R3WVMV25QH"
    };


firebase.default.initializeApp(config);

// Google login
const GoogleProvider = new firebase.default.auth.GoogleAuthProvider();

export const SignInWithGoogle = () => {
    return auth.signInWithRedirect(GoogleProvider);
};


// Registration
export const RegisterWithEmailAndPassword = ( email, password ) => {
    return auth.createUserWithEmailAndPassword(email, password);
};

// Logout
export const Logout = () => {
    return auth.signOut();
};

// Firebase Instances
export const auth = firebase.default.auth();
export const firestore = firebase.default.firestore();

// Collections
export const users = firebase.default.firestore().collection("users");


export default firebase;



