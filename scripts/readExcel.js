import pkg from 'xlsx';
const { readFile, utils } = pkg;
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Lire le fichier Excel
const workbook = readFile('/Users/mac/Downloads/OMI-2024.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convertir en JSON
const data = utils.sheet_to_json(worksheet, { raw: true });

// Afficher la structure et quelques exemples
console.log('Structure des colonnes:', Object.keys(data[0]));
console.log('\nNombre total d\'entrées:', data.length);
console.log('\nPremière entrée:', JSON.stringify(data[0], null, 2));
