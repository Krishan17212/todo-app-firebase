// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// environment variables

const get_apiKey = import.meta.env.VITE_APP_API_KEY;
const get_authDomain = import.meta.env.VITE_APP_AUTH_DOMAIN;
const get_projectId = import.meta.env.VITE_APP_PROJECT_ID;
const get_storageBucket= import.meta.env.VITE_APP_STORAGE_BUCKET;
const get_messagingSenderId = import.meta.env.VITE_APP_MESSAGING_SENDER_ID;
const get_appId = import.meta.env.VITE_APP_API_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${get_apiKey}`,
  authDomain: `${get_authDomain}`,
  projectId: `${get_projectId}`,
  storageBucket: `${get_storageBucket}`,
  messagingSenderId: `${get_messagingSenderId}`,
  appId: `${get_appId}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
