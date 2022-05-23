import { initializeApp } from 'firebase/app';

import {getFirestore} from 'firebase/firestore';

//Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlvZxXX7zUInyl3n20cJDIZRF_8Z2QNIM",
    authDomain: "wondereiz.firebaseapp.com",
    databaseURL: "https://wondereiz-default-rtdb.firebaseio.com",
    projectId: "wondereiz",
    storageBucket: "wondereiz.appspot.com",
    messagingSenderId: "327257030235",
    appId: "1:327257030235:web:c99ab595f0453bf452897e"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);