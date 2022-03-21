import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { firestore, Timestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCCHI48YKpPUs-BrmRPeUBGAMY-On8PytM",
  authDomain: "my-pixel-4431a.firebaseapp.com",
  projectId: "my-pixel-4431a",
  storageBucket: "my-pixel-4431a.appspot.com",
  messagingSenderId: "988257039916",
  appId: "1:988257039916:web:f640e20ddb440124f44389",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);
const timestamp = Timestamp.now();
const serverTimestamp = timestamp.toMillis();
export { auth, db, storage, serverTimestamp };
