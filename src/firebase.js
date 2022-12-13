import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAylfk7qK4taueoswAHCxQSb-9Lec3LZ-4",
  authDomain: "sultan-group.firebaseapp.com",
  projectId: "sultan-group",
  storageBucket: "sultan-group.appspot.com",
  messagingSenderId: "661709957141",
  appId: "1:661709957141:web:36e2eef5bfc3bfc8fac61c",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
