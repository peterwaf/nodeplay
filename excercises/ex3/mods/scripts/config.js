import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA3JMDPM100yuQrL6Ahy5CNv44L7vGDbRU",
  authDomain: "node-blog-94623.firebaseapp.com",
  projectId: "node-blog-94623",
  storageBucket: "node-blog-94623.appspot.com",
  messagingSenderId: "793041274390",
  appId: "1:793041274390:web:02ec14bd5ed68c1cfcd737"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const bucket = getStorage(firebaseApp);
export { db, bucket }