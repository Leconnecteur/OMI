import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Hero from './components/Hero';
import Features from './components/Features';
import Advantages from './components/Advantages';
import Analytics from './components/Analytics';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './pages/Dashboard';
import PropertyInput from './pages/PropertyInput';
import SalesMap from './pages/SalesMap';
import PropertySearch from './pages/PropertySearch';

function App() {
  const { user, loading } = useAuth();

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
            <Route path="/dashboard/data" element={<PropertyInput />} />
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