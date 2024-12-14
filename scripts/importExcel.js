import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import pkg from 'xlsx';
const { readFile, utils } = pkg;

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

// Fonction pour convertir une date Excel en format ISO string
function convertExcelDate(excelDate) {
  if (!excelDate) return new Date().toISOString().split('T')[0];
  
  let date;
  if (typeof excelDate === 'number') {
    // Excel dates are number of days since 1900-01-01
    date = new Date((excelDate - 25569) * 86400 * 1000);
  } else if (typeof excelDate === 'string') {
    // Try to parse the date string
    const parts = excelDate.split('/');
    if (parts.length === 3) {
      // Format: DD/MM/YYYY
      const [day, month, year] = parts;
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(excelDate);
    }
  } else {
    date = new Date();
  }

  // Vérifier si la date est valide
  if (isNaN(date.getTime())) {
    return new Date().toISOString().split('T')[0];
  }

  return date.toISOString().split('T')[0];
}

function convertCondition(condition) {
  const mapping = {
    'À rénover': 'to-renovate',
    'À rafraîchir': 'to-refresh',
    'Bon': 'good',
    'Très bon': 'very-good',
    'Rénové': 'renovated',
    'Neuf': 'new',
    'Haut de gamme': 'high-end',
    'VEFA': 'vefa'
  };
  return mapping[condition] || 'good';
}

function convertOccupancyStatus(status) {
  const mapping = {
    'Libre': 'free',
    'Occupé': 'occupied'
  };
  return mapping[status] || 'free';
}

function convertExterior(exterior) {
  const mapping = {
    'Aucun': 'none',
    'Jardin': 'garden',
    'Terrasse': 'terrace',
    'Balcon': 'balcon'
  };
  return mapping[exterior] || 'none';
}

function convertHouseType(type) {
  const mapping = {
    'Individuelle': 'individual',
    'Individuelle en copropriété': 'individual-condo',
    'Mitoyenne': 'semi-detached',
    'Mitoyenne en copropriété': 'semi-detached-condo'
  };
  return mapping[type] || 'individual';
}

async function processSheet(sheet, type) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = utils.sheet_to_json(sheet);
      console.log(`Traitement de ${data.length} ${type}s...`);
      
      // Ensemble pour suivre les propriétés déjà importées
      const importedProperties = new Set();
      
      let importedCount = 0;
      let skippedCount = 0;
      let duplicateCount = 0;
      let errorCount = 0;

      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        
        // Validation des champs obligatoires selon le type
        let price, firstMandatePrice, surface;

        if (type === 'apartment') {
          price = parseFloat(row['Prix Vente']);
          firstMandatePrice = parseFloat(row['Prix Mandat']);
          surface = parseFloat(row['SHAB']);
        } else if (type === 'house') {
          price = parseFloat(row['Prix Vente']);
          firstMandatePrice = parseFloat(row['Prix Mandat']);
          surface = parseFloat(row['SHAB']);
        } else if (type === 'land') {
          price = parseFloat(row[' Prix Vente ']); // Notez l'espace avant et après
          firstMandatePrice = parseFloat(row[' Prix Mandat ']);
          surface = parseFloat(row['Surface']);
        }

        // Vérification des données obligatoires
        if (isNaN(price) || price <= 0) {
          console.error(`Ligne ${i + 1}: Prix de vente invalide (${row['Prix Vente'] || row[' Prix Vente ']})`);
          skippedCount++;
          continue;
        }

        if (isNaN(firstMandatePrice) || firstMandatePrice <= 0) {
          console.error(`Ligne ${i + 1}: Prix 1er mandat invalide (${row['Prix Mandat'] || row[' Prix Mandat ']})`);
          skippedCount++;
          continue;
        }

        if (isNaN(surface) || surface <= 0) {
          console.error(`Ligne ${i + 1}: Surface invalide (${row['SHAB'] || row['Surface']})`);
          skippedCount++;
          continue;
        }

        // Créer une clé unique pour la propriété
        const propertyKey = `${type}-${price}-${surface}-${row['Ville'] || ''}-${row['Adresse'] || ''}`;
        
        // Vérifier si la propriété existe déjà
        if (importedProperties.has(propertyKey)) {
          console.log(`Ligne ${i + 1}: Doublon détecté (${propertyKey})`);
          duplicateCount++;
          continue;
        }

        // Conversion des dates
        const saleDate = convertExcelDate(row['Date Prms'] || new Date());
        const firstMandateDate = convertExcelDate(row['Date Mdt'] || new Date());

        // Construction de l'objet propriété
        const property = {
          userId: USER_ID,
          type: type,
          typology: type === 'apartment' ? row['Nbre pièce.s']?.toString() : '',
          price: price,
          saleDate: saleDate,
          firstMandateDate: firstMandateDate,
          firstMandatePrice: firstMandatePrice,
          address: row['Adresse'] || '',
          city: row['Ville'] || '',
          district: row['Quartier'] || '',
          parkingSpots: type === 'apartment' ? parseInt(row['PKG']) || 0 : 0,
          condition: convertCondition(row['Etat'] || 'good'),
          epcElectricity: row['DPE Elec'] || 'D',
          epcGes: row['DPE GES'] || 'D',
          occupancyStatus: convertOccupancyStatus(row['Etat Loc.'] || 'free'),
          surface: surface,
          createdAt: new Date().toISOString()
        };

        // Ajout des champs optionnels selon le type
        if (type === 'apartment' || type === 'house') {
          if (type === 'apartment' && row['Etage']) {
            property.floor = row['Etage'].toString();
          }
          if (type === 'house' && row['Construction']) {
            property.constructionYear = row['Construction'].toString();
          }
          if (row['Extérieur']) {
            property.exterior = convertExterior(row['Extérieur']);
          }
          if (row['Expo']) {
            property.exposure = row['Expo'];
          }
        }

        if (type === 'house' || type === 'land') {
          const plotSurface = type === 'house' ? parseFloat(row['Parcelle']) : parseFloat(row['Surface']);
          if (!isNaN(plotSurface) && plotSurface > 0) {
            property.plotSurface = plotSurface;
          }
        }

        if (type === 'house') {
          property.houseType = convertHouseType(row['Type Maison'] || 'individual');
        }

        try {
          await addDoc(collection(db, 'properties'), property);
          importedProperties.add(propertyKey); // Ajouter la propriété à l'ensemble des propriétés importées
          importedCount++;
          console.log(`${type} ${i + 1} importé avec succès (Prix: ${price}€, Surface: ${surface}m²)`);
        } catch (error) {
          console.error(`Erreur lors de l'importation du/de la ${type} ${i + 1}:`, error);
          console.log('Données de la propriété:', property);
          errorCount++;
        }
      }

      console.log(`
Résumé de l'importation pour ${type}s:
- Total traité: ${data.length}
- Importés avec succès: ${importedCount}
- Doublons détectés: ${duplicateCount}
- Ignorés (données invalides): ${skippedCount}
- Erreurs d'importation: ${errorCount}
      `);

      resolve(importedCount);
    } catch (error) {
      reject(error);
    }
  });
}

async function importExcelData(filePath) {
  try {
    const workbook = readFile(filePath);
    console.log('Feuilles disponibles:', workbook.SheetNames);

    const sheets = {
      'Appartements': 'apartment',
      'Maisons': 'house',
      'Terrains': 'land'
    };

    let totalImported = 0;

    for (const [sheetName, propertyType] of Object.entries(sheets)) {
      if (workbook.SheetNames.includes(sheetName)) {
        const sheet = workbook.Sheets[sheetName];
        console.log(`Traitement de ${sheetName}...`);
        const importedCount = await processSheet(sheet, propertyType);
        console.log(`${importedCount} ${propertyType}s importé(e)s avec succès`);
        totalImported += importedCount;
      }
    }

    console.log(`Importation terminée ! ${totalImported} propriétés importées au total.`);

  } catch (error) {
    console.error('Erreur lors de l\'importation:', error);
  }
}

// Lancer l'importation avec le chemin vers votre fichier Excel
const excelFilePath = '/Users/mac/Downloads/OMI-2024.xlsx';
importExcelData(excelFilePath);

export { importExcelData };
