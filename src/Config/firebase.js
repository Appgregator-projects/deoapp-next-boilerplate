// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getDatabase } from "firebase/database";

// import song from "../Assets/Sound/CoinDrop-Notification.mp3"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDHwfzgKXqfknEy3bctrbrlu37_hKeJevo",
	authDomain: "deoapp-indonesia.firebaseapp.com",
	projectId: "deoapp-indonesia",
	storageBucket: "deoapp-indonesia.appspot.com",
	messagingSenderId: "814589130399",
	appId: "1:814589130399:web:a0bb255936eefd57e554aa",
	measurementId: "G-B9FPJL2RD0",
	databaseURL: "https://deoapp-indonesia-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app);
const rtdb = getDatabase(app)
// const configMessage = getMessaging(app);

export {app,analytics,auth,db, storage,rtdb}
