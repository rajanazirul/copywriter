// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPMq1eZVVoQczV1C8KkwcXOHb-T7Rsq0Y",
  authDomain: "copytalenta.firebaseapp.com",
  projectId: "copytalenta",
  storageBucket: "copytalenta.appspot.com",
  messagingSenderId: "601335271889",
  appId: "1:601335271889:web:4c18cad58e5f22318090f0",
  measurementId: "G-VSKZT5024S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db }