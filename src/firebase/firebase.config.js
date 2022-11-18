// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD18kmyZdPLA90VYUkUOs6kKyoCNwKCgLk",
    authDomain: "doctors-portal-beb9d.firebaseapp.com",
    projectId: "doctors-portal-beb9d",
    storageBucket: "doctors-portal-beb9d.appspot.com",
    messagingSenderId: "738177451819",
    appId: "1:738177451819:web:6642fd738ecd6518ff276e",
    measurementId: "G-8JK26XQY22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;