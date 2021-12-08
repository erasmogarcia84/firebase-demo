import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHQZ7vq7UI3_frhBvaiumle14ctyGJSog",
  authDomain: "pt202109-firebase-demo1.firebaseapp.com",
  projectId: "pt202109-firebase-demo1",
  storageBucket: "pt202109-firebase-demo1.appspot.com",
  messagingSenderId: "511811626869",
  appId: "1:511811626869:web:be68d63bc9aa56f661553c",
};

const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
