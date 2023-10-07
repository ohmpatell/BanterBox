// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSLjtLIFWCqAmlOSTDNcDzFliXT9IqaN8",
  authDomain: "banter-box-chatapp.firebaseapp.com",
  databaseURL: "https://banter-box-chatapp-default-rtdb.firebaseio.com",
  projectId: "banter-box-chatapp",
  storageBucket: "banter-box-chatapp.appspot.com",
  messagingSenderId: "985633613474",
  appId: "1:985633613474:web:061100807e605c5306d9fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
