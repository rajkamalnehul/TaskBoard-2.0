/** @format */

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCysSzB-ZUK7oC_u_C7-Z8ciVUdC5bXa7w",
  authDomain: "todoapp-b6e11.firebaseapp.com",
  projectId: "todoapp-b6e11",
  storageBucket: "todoapp-b6e11.appspot.com",
  messagingSenderId: "451439315495",
  appId: "1:451439315495:web:c820c9f768ebbacb499c02",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
