import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import readline from 'readline';

const firebaseConfig = {
  apiKey: "AIzaSyCLSSftrxZGbafuZpmZ0yVt_5tIj6-9yPU",
  authDomain: "windsurf-omi.firebaseapp.com",
  projectId: "windsurf-omi",
  storageBucket: "windsurf-omi.firebasestorage.app",
  messagingSenderId: "197964638460",
  appId: "1:197964638460:web:074c4a5eb44045f5758f79",
  measurementId: "G-CJY7G8BP3G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Créer une interface de lecture pour les entrées utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function getCurrentUserId() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('Votre userId est:', user.uid);
        console.log('\nPour importer les données, utilisez ce userId dans le script d\'importation:');
        console.log('importExcelData("' + user.uid + '")');
        rl.close();
        resolve(user.uid);
      } else {
        resolve(null);
      }
    });
  });
}

// Fonction pour se connecter
async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid;
  } catch (error) {
    console.error('Erreur de connexion:', error.message);
    return null;
  }
}

// Fonction principale
async function main() {
  try {
    let userId = await getCurrentUserId();
    
    if (!userId) {
      console.log('Veuillez vous connecter pour obtenir votre userId.');
      const email = await question('Email: ');
      const password = await question('Mot de passe: ');
      
      userId = await login(email, password);
      
      if (userId) {
        console.log('Connexion réussie !');
        await getCurrentUserId();
      }
    }
  } catch (error) {
    console.error('Erreur:', error);
  } finally {
    setTimeout(() => process.exit(), 1000);
  }
}

// Lancer le script
main();
