import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCLSSftrxZGbafuZpmZ0yVt_5tIj6-9yPU",
  authDomain: "windsurf-omi.firebaseapp.com",
  projectId: "windsurf-omi",
  storageBucket: "windsurf-omi.firebasestorage.app",
  messagingSenderId: "197964638460",
  appId: "1:197964638460:web:074c4a5eb44045f5758f79",
  measurementId: "G-CJY7G8BP3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteAllProperties() {
  try {
    const querySnapshot = await getDocs(collection(db, 'properties'));
    console.log(`Suppression de ${querySnapshot.size} propriétés...`);
    
    let deletedCount = 0;
    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
      deletedCount++;
      console.log(`${deletedCount}/${querySnapshot.size} propriétés supprimées`);
    }
    
    console.log('Toutes les propriétés ont été supprimées avec succès !');
  } catch (error) {
    console.error('Erreur lors de la suppression des propriétés:', error);
  }
}

// Lancer la suppression
deleteAllProperties();
