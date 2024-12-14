import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCLSSftrxZGbafuZpmZ0yVt_5tIj6-9yPU",
  authDomain: "windsurf-omi.firebaseapp.com",
  projectId: "windsurf-omi",
  storageBucket: "windsurf-omi.firebasestorage.app",
  messagingSenderId: "197964638460",
  appId: "1:197964638460:web:074c4a5eb44045f5758f79",
  measurementId: "G-CJY7G8BP3G"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);