// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw052wqEYS_qan_UH2MFs0jQwaEV_Jc1E",
  authDomain: "quranapp-c8c91.firebaseapp.com",
  projectId: "quranapp-c8c91",
  storageBucket: "quranapp-c8c91.firebasestorage.app",
  messagingSenderId: "397516827962",
  appId: "1:397516827962:web:3a0c3c3eb6419de62ab403"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);
export {auth};