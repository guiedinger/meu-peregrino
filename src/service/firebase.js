import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoBqSjfa-10hfHElSXkkfGiLiJrjz5yr8",
  authDomain: "meuperegrino.firebaseapp.com",
  projectId: "meuperegrino",
  storageBucket: "meuperegrino.appspot.com",
  messagingSenderId: "276897462064",
  appId: "1:276897462064:web:cd201db4dfb4bf4d42baf5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);