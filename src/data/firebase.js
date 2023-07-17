
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDcPOmd7jc9NUb-5UgbxbA8mdUo1CTL5ns",
    authDomain: "chat-react-faa3e.firebaseapp.com",
    projectId: "chat-react-faa3e",
    storageBucket: "chat-react-faa3e.appspot.com",
    messagingSenderId: "183797837180",
    appId: "1:183797837180:web:15c4b3f089295f2a26c8f9",
    measurementId: "G-CHMLGQJ450"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const databaseApp = getFirestore(app);
