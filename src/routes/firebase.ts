import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBW1hfuCB3ztL5DDPL-CYs9p6OtDRqLSz8",
  authDomain: "jwitter-app.firebaseapp.com",
  projectId: "jwitter-app",
  storageBucket: "jwitter-app.appspot.com",
  messagingSenderId: "769664419395",
  appId: "1:769664419395:web:82e036648e624776ceb6f6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app)