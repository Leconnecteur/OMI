import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

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

const USER_ID = "dgKFCm0J48cEhFHJnfr1eelyzFm2";

async function cleanInvalidProperties() {
  try {
    console.log('Début du nettoyage des données...');
    
    // Créer une requête pour trouver toutes les propriétés avec prix = 1
    const q = query(
      collection(db, 'properties'),
      where('userId', '==', USER_ID),
      where('price', '==', 1)
    );

    // Récupérer les documents
    const querySnapshot = await getDocs(q);
    const totalToDelete = querySnapshot.size;
    
    console.log(`Nombre de propriétés à supprimer : ${totalToDelete}`);
    
    if (totalToDelete === 0) {
      console.log('Aucune propriété invalide trouvée.');
      return;
    }

    let deletedCount = 0;
    
    // Supprimer chaque document
    for (const doc of querySnapshot.docs) {
      try {
        await deleteDoc(doc.ref);
        deletedCount++;
        console.log(`Progression : ${deletedCount}/${totalToDelete} (${Math.round(deletedCount/totalToDelete*100)}%)`);
      } catch (error) {
        console.error(`Erreur lors de la suppression du document ${doc.id}:`, error);
      }
    }

    console.log(`
Résumé du nettoyage :
- Total de propriétés invalides trouvées : ${totalToDelete}
- Propriétés supprimées avec succès : ${deletedCount}
- Échecs de suppression : ${totalToDelete - deletedCount}
    `);

  } catch (error) {
    console.error('Erreur lors du nettoyage des données:', error);
  }
}

// Exécuter le nettoyage
cleanInvalidProperties().then(() => {
  console.log('Opération de nettoyage terminée');
  process.exit(0);
}).catch(error => {
  console.error('Erreur fatale:', error);
  process.exit(1);
});
