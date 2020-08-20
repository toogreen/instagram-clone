import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAtUAeuVrFiLNW9vwzDWDAUSX6TMpVmXp8",
    authDomain: "instagram-clone-react-9f534.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-9f534.firebaseio.com",
    projectId: "instagram-clone-react-9f534",
    storageBucket: "instagram-clone-react-9f534.appspot.com",
    messagingSenderId: "39603627582",
    appId: "1:39603627582:web:7a8912e95ba673b93d936f",
    measurementId: "G-L058CBY376"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };