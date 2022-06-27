import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/database';

let firebaseConfig = {
  apiKey: "AIzaSyDW2xlLNC1JiqpfduHMaRsUk7iRxTbTBU0",
  authDomain: "cursoreact-7451b.firebaseapp.com",
  projectId: "cursoreact-7451b",
  storageBucket: "cursoreact-7451b.appspot.com",
  messagingSenderId: "916104695375",
  appId: "1:916104695375:web:cfc9dbb640ec8a54ad243a",
  measurementId: "G-XCMPZM8J6D"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;