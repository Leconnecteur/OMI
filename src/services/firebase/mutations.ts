import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Property } from '../../types/property';

export const createProperty = async (
  data: Omit<Property, 'createdAt' | 'userId'>, 
  userId: string
): Promise<string> => {
  const propertiesRef = collection(db, 'properties');
  const docRef = await addDoc(propertiesRef, {
    ...data,
    userId,
    createdAt: Timestamp.now()
  });
  return docRef.id;
};