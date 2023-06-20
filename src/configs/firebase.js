// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHwfzgKXqfknEy3bctrbrlu37_hKeJevo",
  authDomain: "deoapp-indonesia.firebaseapp.com",
  databaseURL: "https://deoapp-indonesia-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "deoapp-indonesia",
  storageBucket: "deoapp-indonesia.appspot.com",
  messagingSenderId: "814589130399",
  appId: "1:814589130399:web:a0bb255936eefd57e554aa",
  measurementId: "G-B9FPJL2RD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
