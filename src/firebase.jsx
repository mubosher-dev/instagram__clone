import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCK2hGmur2VN8KbON7WFKN_zz2QpY-8zsM",
    authDomain: "slack-clone-af2a5.firebaseapp.com",
    projectId: "slack-clone-af2a5",
    storageBucket: "slack-clone-af2a5.appspot.com",
    messagingSenderId: "150571282982",
    appId: "1:150571282982:web:438753f98513bad1732ce7",
    measurementId: "G-WT4YENSTTZ"
};
const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

export { auth, storage, db }
