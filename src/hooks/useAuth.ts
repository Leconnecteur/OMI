import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler une vérification d'authentification
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      setUser(isAuthenticated);
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { user, loading };
};

export default useAuth;