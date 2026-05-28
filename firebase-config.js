export const firebaseConfig = {
  // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiGCGaEUDSkZRM4Wvko4a45TsJkr-Kq7I",
  authDomain: "haydo-lie-detector.firebaseapp.com",
  databaseURL: "https://haydo-lie-detector-default-rtdb.firebaseio.com",
  projectId: "haydo-lie-detector",
  storageBucket: "haydo-lie-detector.firebasestorage.app",
  messagingSenderId: "470148443985",
  appId: "1:470148443985:web:3b1303ea12ac7646b36d70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
