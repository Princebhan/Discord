//import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9zsCdSa_-FV8DBn_y4SQzVzZR4w8wpd8",
  authDomain: "unitytalk-bfd69.firebaseapp.com",
  databaseURL: "https://unitytalk-bfd69-default-rtdb.firebaseio.com",
  projectId: "unitytalk-bfd69",
  storageBucket: "unitytalk-bfd69.appspot.com",
  messagingSenderId: "344281375143",
  appId: "1:344281375143:web:f6423c3cd569bac31f1682"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
