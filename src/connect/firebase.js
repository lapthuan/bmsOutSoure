// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyATCvH6j76amKvrNwQOMpe2cltTuuYNwU4",
    authDomain: "outsoure.firebaseapp.com",
    databaseURL: "https://outsoure-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "outsoure",
    storageBucket: "outsoure.appspot.com",
    messagingSenderId: "471681329375",
    appId: "1:471681329375:web:7ffc651f71a58c5b70616a",
    measurementId: "G-GR0KFLGD95"
};


const app = initializeApp(firebaseConfig);


const database = getDatabase(app);

export { database };