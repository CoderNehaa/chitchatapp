import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBdwz0qYuSFcU82kOn-kLt7FewFpaBuJ-k",
  authDomain: "chichat-1711d.firebaseapp.com",
  projectId: "chichat-1711d",
  storageBucket: "chichat-1711d.appspot.com",
  messagingSenderId: "1051744965125",
  appId: "1:1051744965125:web:107ae9b10b0411ef16026c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
export default db;
