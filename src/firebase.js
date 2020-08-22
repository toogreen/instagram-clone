import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCqiSiblTNELXe0QSkjxt5UakPKVUIs7C4",
    authDomain: "instagreen-3b45c.firebaseapp.com",
    databaseURL: "https://instagreen-3b45c.firebaseio.com",
    projectId: "instagreen-3b45c",
    storageBucket: "instagreen-3b45c.appspot.com",
    messagingSenderId: "261427303238",
    appId: "1:261427303238:web:90d0385f97d379fbf80b47",
    measurementId: "G-EXNRJ139PF"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };