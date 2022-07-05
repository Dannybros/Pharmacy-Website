import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-7EcSfMvjGn0OQBe2VzUB6Ecb1khRR7g",
  authDomain: "pharmacy-248f0.firebaseapp.com",
  projectId: "pharmacy-248f0",
  storageBucket: "pharmacy-248f0.appspot.com",
  messagingSenderId: "285473170492",
  appId: "1:285473170492:web:5cfc3138c027d5a5d08f39",
  measurementId: "G-JZK6F1LMPZ"
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);