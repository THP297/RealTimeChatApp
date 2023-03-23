import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQ3ygkW310ER_pFwcSB1N23-G3uwKzjiI",
  authDomain: "chat-app-8a230.firebaseapp.com",
  projectId: "chat-app-8a230",
  storageBucket: "chat-app-8a230.appspot.com",
  messagingSenderId: "1060288654271",
  appId: "1:1060288654271:web:5185be081826075989cf0a",
  measurementId: "G-V0CLQ47DLD",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

// auth.useEmulator("http://localhost:9099");
// if (window.location.hostname === "localhost") {
//   db.useEmulator("localhost", "8080");
// }

export { auth, db };
export default firebase;
