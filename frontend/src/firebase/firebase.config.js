// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_APP_KEY,
  appId: import.meta.env.VITE_FB_APP_ID,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
};
const app = initializeApp(firebaseConfig);
export default app;

export const auth = getAuth();
export const db = getDatabase(app);

auth.useDeviceLanguage();


