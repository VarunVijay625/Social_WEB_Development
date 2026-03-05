// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDP7snJVxhiQSQs7Z8CzGA9uvk5qdLkJhQ",
  authDomain: "social-web-dev.firebaseapp.com",
  projectId: "social-web-dev",
  storageBucket: "social-web-dev.firebasestorage.app",
  messagingSenderId: "621332128804",
  appId: "1:621332128804:web:94424f8ba5b97549fbe4b1",
  measurementId: "G-S0J91M5KEQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);