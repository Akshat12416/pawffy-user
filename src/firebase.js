import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// 🔍 DEBUG: Check if env variables are loading
console.log('Environment Variables Check:');
console.log('API Key exists:', !!process.env.REACT_APP_FIREBASE_API_KEY);
console.log('Auth Domain:', process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
console.log('Project ID:', process.env.REACT_APP_FIREBASE_PROJECT_ID);

// Firebase config from .env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Validate config before initialization
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Firebase config is incomplete!');
  console.error('Make sure your .env file exists and contains all required variables');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };