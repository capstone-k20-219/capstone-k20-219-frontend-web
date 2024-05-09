import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyCisUhdUH3PEH6sjOuKkn2oJpCXu4V_hxQ",
//   authDomain: "pakislot.firebaseapp.com",
//   projectId: "pakislot",
//   storageBucket: "pakislot.appspot.com",
//   messagingSenderId: "1073336868430",
//   appId: "1:1073336868430:web:720cc445a0212ca97bad1f",
//   measurementId: "G-6EXH56RXY2",
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
