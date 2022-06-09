// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTVeIUXiNa1gJA_UhFtoN3a7GWpUl0ZSg",
  authDomain: "intagram-clonee.firebaseapp.com",
  projectId: "intagram-clonee",
  storageBucket: "intagram-clonee.appspot.com",
  messagingSenderId: "60330832682",
  appId: "1:60330832682:web:19ff448b951c051d4ce453",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, storage, provider, auth };
