import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

/*
const appConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREABSE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  }
  */

  const firebaseConfig = {
    apiKey: "AIzaSyDK1GYXsfADfa5QbSnoTSH5Hw1N3Dp-aHo",
    authDomain: "hamsterwheeltracker.firebaseapp.com",
    databaseURL: "https://hamsterwheeltracker-default-rtdb.firebaseio.com",
    projectId: "hamsterwheeltracker",
    storageBucket: "hamsterwheeltracker.appspot.com",
    messagingSenderId: "395134580216",
    appId: "1:395134580216:web:5a1a673fdb20039c96d20d",
    measurementId: "G-CXGTPHS5EV"
  };

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = firebase.database();
export default app;