// For Expo or bare RN with 'firebase' package
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC3aOLpBvMX5yGPs9lcIDJ87kFN_H3wohc",
  authDomain: "rise-fdd6c.firebaseapp.com",
  projectId: "rise-fdd6c",
  storageBucket: "rise-fdd6c.firebasestorage.app",
  messagingSenderId: "277259804044",
  appId: "1:277259804044:web:4d4f3eca42fa9d08390aa9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);