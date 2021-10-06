
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyAGd-4Va6VIfqo188uo2YzPDNfyhHBUxwU",
    authDomain: "react-app-69c82.firebaseapp.com",
    projectId: "react-app-69c82",
    storageBucket: "react-app-69c82.appspot.com",
    messagingSenderId: "274337685382",
    appId: "1:274337685382:web:0fe589d3702b3c66b75607"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
/* Se hace lo mismo para github, twitter, etc etc */
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}

