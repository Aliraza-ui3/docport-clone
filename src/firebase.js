// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCihNNpvq3SRAMRkAKPOcRAnj_Tan69WNs",
  authDomain: "docport-cfd8b.firebaseapp.com",
  projectId: "docport-cfd8b",
  storageBucket: "docport-cfd8b.appspot.com", // fixed domain here
  messagingSenderId: "422660236046",
  appId: "1:422660236046:web:18fe2b8b1f0c1238a4ed5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Export the auth instance for use in your app
export { auth };
