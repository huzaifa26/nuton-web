import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export const app = initializeApp({
  apiKey: "AIzaSyAciZqASRT_0f4gGW5Ct6JhYlDBGdvgrfI",
  authDomain: "mobile-28752.firebaseapp.com",
  projectId: "mobile-28752",
  storageBucket: "mobile-28752.appspot.com",
  messagingSenderId: "241130855958",
  appId: "1:241130855958:web:b9627b8f2c409cb5ef1f37"
});

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };