import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYNAuc6mWXms7NGTZ-HHryuOjT05Jd9dw",
  authDomain: "ccrud-3f23f.firebaseapp.com",
  projectId: "ccrud-3f23f",
  storageBucket: "ccrud-3f23f.appspot.com",
  messagingSenderId: "401068507553",
  appId: "1:401068507553:web:54b37200f584af0f0ccbe0",
  measurementId: "G-64KX9TFRS2"
  
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

