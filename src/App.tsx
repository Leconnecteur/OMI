import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { auth } from './config/firebase';
import Hero from './components/Hero';
import Features from './components/Features';
import Advantages from './components/Advantages';
import Analytics from './components/Analytics';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './pages/Dashboard';
import PropertyPage from './pages/PropertyPage';
import SalesMap from './pages/SalesMap';
import PropertySearch from './pages/PropertySearch';

function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('Firebase Config:', {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID
    });

    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth State Changed:', user ? 'User logged in' : 'No user');
      if (user) {
        console.log('User ID:', user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/map" element={<SalesMap />} />
            <Route path="/dashboard/search" element={<PropertySearch />} />
            <Route path="/dashboard/data" element={<PropertyPage />} />
            <Route path="/dashboard/history" element={<PropertyPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={
              <div className="min-h-screen bg-white">
                <Hero />
                <Features />
                <Advantages />
                <Analytics />
                <ContactForm />
                <Footer />
              </div>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;