import { FirebaseError } from 'firebase/app';

export interface FirebaseErrorResponse {
  message: string;
  isIndexError: boolean;
  code: string;
}

export const parseFirebaseError = (error: unknown): FirebaseErrorResponse => {
  if (error instanceof FirebaseError) {
    if (error.code === 'failed-precondition') {
      return {
        message: 'The system is still preparing your data. This may take a few minutes.',
        isIndexError: true,
        code: error.code
      };
    }
    return {
      message: error.message,
      isIndexError: false,
      code: error.code
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    isIndexError: false,
    code: 'unknown'
  };
};