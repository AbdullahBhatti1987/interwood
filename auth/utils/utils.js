import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";

import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
    getFirestore ,
    doc,
    setDoc,
    addDoc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import {
    getStorage, 
    ref ,
    // set,
    uploadBytes ,
    getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

// Tumhara Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkN7E7k_AbA3uBE257Rm64iLkQFX5Png4",
    authDomain: "ecommerce-website-4c0da.firebaseapp.com",
    projectId: "ecommerce-website-4c0da",
    storageBucket: "ecommerce-website-4c0da.appspot.com",
    messagingSenderId: "649498934139",
    appId: "1:649498934139:web:5728b93ac9d4b360c7dbde",
    measurementId: "G-CKSD0KR5QX"
  };

// Firebase initialize karna
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);  


// Export statements
export {
    auth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    db ,
    doc,
    setDoc,
    addDoc,
    collection,
    query,
    where,
    getDoc,
    getDocs,
    storage, 
    ref ,
    uploadBytes ,
    getDownloadURL, 
    // set,
};
