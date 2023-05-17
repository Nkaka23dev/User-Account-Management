import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
    apiKey: "AIzaSyBV371JBsRBQULdWY9OaX_w0CkIlN-Zmoo",
    authDomain: "account-mngt.firebaseapp.com",
    projectId: "account-mngt",
    storageBucket: "account-mngt.appspot.com",
    messagingSenderId: "274961844958",
    appId: "1:274961844958:web:f75889aa5414d1d0d7904f",
    measurementId: "G-BE57545PMR"
};

// Initialize Firebase
const app = initializeApp(config);

const auth = getAuth(app); 
const db = getFirestore(app);
const storage = getStorage(app);


export { db, auth, storage };