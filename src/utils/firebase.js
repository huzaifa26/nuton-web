import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// const config={
//   apiKey: "AIzaSyAciZqASRT_0f4gGW5Ct6JhYlDBGdvgrfI",
//   authDomain: "mobile-28752.firebaseapp.com",
//   projectId: "mobile-28752",
//   storageBucket: "mobile-28752.appspot.com",
//   messagingSenderId: "241130855958",
//   appId: "1:241130855958:web:b9627b8f2c409cb5ef1f37"
// }

const config = {
  apiKey: "AIzaSyBTdd7a8mCa4ccnQZ7cY7FPoVQMBByZ7wI",
  authDomain: "egeria-fd634.firebaseapp.com",
  projectId: "egeria-fd634",
  storageBucket: "egeria-fd634.appspot.com",
  messagingSenderId: "999099935416",
  appId: "1:999099935416:web:b6fecef066c51e790ae24d",
  measurementId: "G-JJLX6ZYRSR"
};

export const app = initializeApp(config);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };