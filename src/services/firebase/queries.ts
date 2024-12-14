import { 
  collection,
  query,
  where,
  orderBy,
  getDocs,
  DocumentData,
  limit,
  Timestamp,
  QuerySnapshot
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const handleQueryError = (error: any): DocumentData[] => {
  if (error?.code === 'failed-precondition') {
    console.error('Firebase index not ready. Please wait for indexes to build.');
    return [];
  }
  console.error('Firebase query error:', error);
  return [];
};

const processQuerySnapshot = (snapshot: QuerySnapshot): DocumentData[] => {
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      saleDate: data.saleDate || new Date().toISOString()
    };
  });
};

export const getPropertiesQuery = async (userId: string): Promise<DocumentData[]> => {
  if (!userId) return [];

  try {
    const propertiesRef = collection(db, 'properties');
    // Simplified query without complex ordering
    const q = query(
      propertiesRef,
      where('userId', '==', userId),
      limit(100) // Add reasonable limit
    );
    
    const snapshot = await getDocs(q);
    return processQuerySnapshot(snapshot);
  } catch (error) {
    return handleQueryError(error);
  }
};

export const getRecentPropertiesQuery = async (userId: string): Promise<DocumentData[]> => {
  if (!userId) return [];

  try {
    const propertiesRef = collection(db, 'properties');
    const q = query(
      propertiesRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50) // Add reasonable limit
    );
    
    const snapshot = await getDocs(q);
    return processQuerySnapshot(snapshot);
  } catch (error) {
    return handleQueryError(error);
  }
};