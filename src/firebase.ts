import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGdVzB6oQ-OFa-4xNonP92vTL-S0ciyuw",
  authDomain: "hakathon-8b9f7.firebaseapp.com",
  projectId: "hakathon-8b9f7",
  storageBucket: "hakathon-8b9f7.firebasestorage.app",
  messagingSenderId: "491465474009",
  appId: "1:491465474009:web:7a557a0059accc3be5e3c8",
  measurementId: "G-WSWQKC117J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;