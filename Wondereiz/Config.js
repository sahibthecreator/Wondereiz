import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';


//Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlvZxXX7zUInyl3n20cJDIZRF_8Z2QNIM",
  authDomain: "wondereiz.firebaseapp.com",
  databaseURL: "https://wondereiz-default-rtdb.firebaseio.com",
  projectId: "wondereiz",
  storageBucket: "wondereiz.appspot.com",
  messagingSenderId: "327257030235",
  appId: "1:327257030235:web:c99ab595f0453bf452897e",
};


export const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);

