import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCVsY1o01dLQOr1SeXOeZUumj-DXeSiubo",
  authDomain: "chat-a6aac.firebaseapp.com",
  projectId: "chat-a6aac",
  storageBucket: "chat-a6aac.appspot.com",
  messagingSenderId: "880045222393",
  appId: "1:880045222393:web:22d083e784cf1a62e3f528",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const firestore = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, firestore, provider };
