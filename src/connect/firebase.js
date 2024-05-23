// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAhLZ9u_bUYI9KAHD-GyK7k1aTWlwN3Cd8",
    authDomain: "taonghile.firebaseapp.com",
    databaseURL: "https://taonghile-default-rtdb.firebaseio.com",
    projectId: "taonghile",
    storageBucket: "taonghile.appspot.com",
    messagingSenderId: "720692015030",
    appId: "1:720692015030:web:8bb9f68cadc2b47c63db17",
    measurementId: "G-7KYZLEP1W3"
};


const app = initializeApp(firebaseConfig);


const database = getDatabase(app);

export { database };