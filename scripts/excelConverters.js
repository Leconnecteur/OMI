// Convertir la date Excel (nombre de jours depuis 1900) en format ISO
function excelDateToISO(excelDate) {
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  return date.toISOString().split('T')[0];
}

// Mapper l'état du bien
function mapCondition(etat) {
  const conditionMap = {
    'À rénover': 'to-renovate',
    'À rafraîchir': 'to-refresh',
    'Bon': 'good',
    'Très bon': 'very-good',
    'Rénové': 'renovated',
    'Neuf': 'new',
    'Haut de gamme': 'high-end',
    'VEFA': 'vefa'
  };
  return conditionMap[etat] || 'good';
}

// Mapper l'extérieur
function mapExterior(exterieur) {
  const exteriorMap = {
    'Aucun': 'none',
    'Jardin': 'garden',
    'Terrasse': 'terrace',
    'Balcon': 'balcon'
  };
  return exteriorMap[exterieur] || null;
}

// Mapper l'exposition
function mapExposure(expo) {
  const exposureMap = {
    'N': 'N',
    'NE': 'NE',
    'E': 'E',
    'SE': 'SE',
    'S': 'S',
    'SO': 'SO',
    'O': 'O',
    'NO': 'NO'
  };
  return exposureMap[expo] || null;
}

// Mapper l'état locatif
function mapOccupancyStatus(etatLoc) {
  return etatLoc === 'Occupé' ? 'occupied' : 'free';
}

// Convertir une ligne Excel en objet Property
function convertExcelRowToProperty(row, userId) {
  return {
    type: 'apartment', // Par défaut, on considère que ce sont des appartements
    typology: row['Nbre pièce.s']?.toString() || '',
    price: Number(row['Prix Vente']) || 0,
    saleDate: excelDateToISO(row['Date Prms']),
    firstMandateDate: excelDateToISO(row['Date Mdt']),
    firstMandatePrice: Number(row['Prix Mandat']) || 0,
    address: row['Adresse'] || '',
    city: row['Ville'] || '',
    district: row['Quartier'] || '',
    parkingSpots: Number(row['PKG']) || 0,
    floor: row['Etage']?.toString() || null,
    exterior: mapExterior(row['Extérieur']),
    exposure: mapExposure(row['Expo']),
    condition: mapCondition(row['Etat']),
    epcElectricity: row['DPE Elec'] || 'D',
    epcGes: row['DPE GES'] || 'D',
    occupancyStatus: mapOccupancyStatus(row['Etat Loc.']),
    surface: Number(row['SHAB']) || 0,
    userId: userId,
    createdAt: new Date()
  };
}

export {
  excelDateToISO,
  mapCondition,
  mapExterior,
  mapExposure,
  mapOccupancyStatus,
  convertExcelRowToProperty
};
