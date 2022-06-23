import firebase from "firebase/app";
import initializeApp from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDW2xlLNC1JiqpfduHMaRsUk7iRxTbTBU0",
    authDomain: "cursoreact-7451b.firebaseapp.com",
    projectId: "cursoreact-7451b",
    storageBucket: "cursoreact-7451b.appspot.com",
    messagingSenderId: "916104695375",
    appId: "1:916104695375:web:cfc9dbb640ec8a54ad243a",
    measurementId: "G-XCMPZM8J6D"
  };
  
  // Initialize Firebase
  if(firebase.apps.length){
  const app = initializeApp(firebaseConfig);
  }

  export default firebase;