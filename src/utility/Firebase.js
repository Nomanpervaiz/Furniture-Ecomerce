import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-SlIT7qAGizsrnIoQ7ySRboJNrfFHW0A",
  authDomain: "furniture-eccomerce.firebaseapp.com",
  projectId: "furniture-eccomerce",
  storageBucket: "furniture-eccomerce.appspot.com",
  messagingSenderId: "551228617401",
  appId: "1:551228617401:web:2aae19ab3510629dee6168",
  measurementId: "G-RVFNJ4LPRF"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { db , provider ,analytics, auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup }