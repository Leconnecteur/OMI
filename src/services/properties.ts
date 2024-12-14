import { collection, query, where, getDocs, orderBy, limit, Timestamp, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Property } from '../types/property';

export async function submitProperty(
  data: Omit<Property, 'createdAt' | 'userId'>, 
  userId: string
): Promise<string> {
  if (!userId) {
    throw new Error('User ID is required to submit a property');
  }

  // Nettoyage des données avant soumission
  const cleanData = {
    ...data,
    // Conversion des chaînes vides en null pour les champs optionnels
    houseType: data.houseType || null,
    floor: data.floor || null,
    constructionYear: data.constructionYear || null,
    exterior: data.exterior === 'none' ? null : data.exterior,
    exposure: data.exposure || null,
    topography: data.type === 'land' ? data.topography : null,
    sanitation: data.type === 'land' ? data.sanitation : null,
    servicing: data.type === 'land' ? data.servicing : null,
    // Conversion des nombres
    price: Number(data.price),
    firstMandatePrice: Number(data.firstMandatePrice),
    surface: Number(data.surface),
    parkingSpots: Number(data.parkingSpots),
    plotSurface: data.plotSurface ? Number(data.plotSurface) : null
  };

  try {
    const propertiesRef = collection(db, 'properties');
    const docRef = await addDoc(propertiesRef, {
      ...cleanData,
      userId,
      createdAt: Timestamp.now(),
      saleDate: data.saleDate || new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error submitting property:', error);
    throw new Error('Failed to submit property. Please try again later.');
  }
}

export async function getRecentSales(months: number = 12, userId: string): Promise<Property[]> {
  if (!userId) return [];

  try {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const propertiesRef = collection(db, 'properties');
    const q = query(
      propertiesRef,
      where('userId', '==', userId),
      orderBy('saleDate', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const properties = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt)
      } as Property;
    });

    // Filtrer les propriétés après avoir récupéré les données
    return properties.filter(property => {
      const saleDate = new Date(property.saleDate);
      return saleDate >= startDate;
    });
  } catch (error) {
    console.error('Error getting recent sales:', error);
    return [];
  }
}

export async function getPropertyStats(userId: string): Promise<{ currentMonthSales: number, previousMonthSales: number, salesTrend: number }> {
  if (!userId) {
    return {
      currentMonthSales: 0,
      previousMonthSales: 0,
      salesTrend: 0
    };
  }

  try {
    const propertiesRef = collection(db, 'properties');
    const q = query(
      propertiesRef,
      where('userId', '==', userId),
      orderBy('saleDate', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const properties = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

    const { startOfMonth, endOfMonth } = getCurrentMonthRange();
    const { startOfPreviousMonth, endOfPreviousMonth } = getPreviousMonthRange();

    const currentMonthSales = properties.filter(sale => {
      const saleDate = new Date(sale.saleDate);
      return saleDate >= startOfMonth && saleDate <= endOfMonth;
    }).length;

    const previousMonthSales = properties.filter(sale => {
      const saleDate = new Date(sale.saleDate);
      return saleDate >= startOfPreviousMonth && saleDate <= endOfPreviousMonth;
    }).length;

    const salesTrend = calculateSalesTrend(currentMonthSales, previousMonthSales);

    return {
      currentMonthSales,
      previousMonthSales,
      salesTrend
    };
  } catch (error) {
    console.error('Error getting property stats:', error);
    return {
      currentMonthSales: 0,
      previousMonthSales: 0,
      salesTrend: 0
    };
  }
}