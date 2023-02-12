import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUf7g0tvRwNOvtJly9mk4arDKK1Csz_B8",
  authDomain: "netflix-clone-9ccb0.firebaseapp.com",
  projectId: "netflix-clone-9ccb0",
  storageBucket: "netflix-clone-9ccb0.appspot.com",
  messagingSenderId: "741324219113",
  appId: "1:741324219113:web:5e24cce3b0a60f004c4678",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth(firebaseApp);

export { auth };
export default db;
