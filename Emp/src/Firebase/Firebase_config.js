import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDntM4jbi5aRSWy6-ibciMbQf8m7K-VRd4",
    authDomain: "freelance-bharat-25c8f.firebaseapp.com",
    projectId: "freelance-bharat-25c8f",
    storageBucket: "freelance-bharat-25c8f.appspot.com",
    messagingSenderId: "390127297853",
    appId: "1:390127297853:web:63cbf74f255980fba01154"
};

const app = initializeApp(firebaseConfig);
export const firebaseDb = getStorage(app)