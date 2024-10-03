import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBQaRY2bzw8IylhSJALl2nJniv-H5PEK1s",
  authDomain: "daily-blog-journal.firebaseapp.com",
  projectId: "daily-blog-journal",
  storageBucket: "daily-blog-journal.appspot.com",
  messagingSenderId: "574228597034",
  appId: "1:574228597034:web:eb32de789ef55abae1b653"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const bucket = getStorage(app);

export { db, bucket };