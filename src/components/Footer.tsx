import React from 'react';
import logoImage from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-[#4A4238] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center">
          <img src={logoImage} alt="OMI Logo" className="h-32 w-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-[#E5DED5]">
            Observatoire du Marché Immobilier
          </h2>
          <p className="text-[#E5DED5]/80 text-center">
            Votre partenaire de confiance pour l'analyse du marché immobilier
          </p>
          <div className="mt-6 text-sm text-[#E5DED5]/60">
            &copy; {new Date().getFullYear()} Observatoire du Marché Immobilier. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}