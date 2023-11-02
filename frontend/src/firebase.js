import { initializeApp } from "firebase/app";
const config = {
    apiKey: "AIzaSyC9PX2W50qy0WbttpzEF9ydJi9xUa_rllM",
    authDomain: "klopa-331507.firebaseapp.com",
    // databaseURL: "https://klopa-331507-default-rtdb.europe-west1.firebasedatabase.app",
    databaseURL: "https://klopaba-backend.europe-west1.firebasedatabase.app",
    projectId: "klopa-331507",
    storageBucket: "klopaba",
    messagingSenderId: "865883902494",
    appId: "1:865883902494:web:4b93316de42eb5a0f4140f",
    measurementId: "G-D7Y5NNG53P"
};


const firebase = initializeApp(config)

export default firebase;