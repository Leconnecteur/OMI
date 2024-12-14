import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

const CACHE_COLLECTION = 'cache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: any;
  timestamp: number;
}

export const getCachedData = async (key: string, userId: string): Promise<any | null> => {
  try {
    const cacheRef = doc(db, CACHE_COLLECTION, `${userId}_${key}`);
    const cacheDoc = await getDoc(cacheRef);
    
    if (!cacheDoc.exists()) return null;
    
    const cache = cacheDoc.data() as CacheEntry;
    const isExpired = Date.now() - cache.timestamp > CACHE_EXPIRY;
    
    return isExpired ? null : cache.data;
  } catch (error) {
    console.warn('Cache read failed:', error);
    return null;
  }
};

export const setCachedData = async (key: string, userId: string, data: any): Promise<void> => {
  try {
    const cacheRef = doc(db, CACHE_COLLECTION, `${userId}_${key}`);
    await setDoc(cacheRef, {
      data,
      timestamp: Date.now()
    });
  } catch (error) {
    console.warn('Cache write failed:', error);
  }
};