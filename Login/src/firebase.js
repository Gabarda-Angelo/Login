

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import "firebase/compat/database";

var firebaseConfig = {
   apiKey: "AIzaSyBwdzGeR5KX_A3_GL0TsN0gyCpvb---OkM",
   authDomain: "react-firebase-auth-4cb65.firebaseapp.com",
   projectId: "react-firebase-auth-4cb65",
   storageBucket: "react-firebase-auth-4cb65.appspot.com",
   messagingSenderId: "1807189853",
   appId: "1:1807189853:web:8f248274fdb53acf384ab4"
};

const firebaseDB = firebase.initializeApp(firebaseConfig);

const db = firebaseDB.database().ref();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider(); 




export { auth, googleAuthProvider, facebookAuthProvider, db };
