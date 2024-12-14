import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.png';

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Image de fond avec overlay */}
      <div className="absolute inset-0">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D22AQEvZkTitFOZtA/feedshare-shrink_800/feedshare-shrink_800/0/1722258707476?e=2147483647&v=beta&t=crvzT3ym3gIy79_14IS2I3Ott2ZIbrbrcBFCodRxeoE"
          alt="Interface analytique immobilière"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4A4238]/95 via-[#4A4238]/80 to-transparent"></div>
      </div>

      {/* Navigation */}
      <div className="relative z-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex justify-end">
            <Link
              to="/login"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-full bg-[#E5DED5] text-[#4A4238] hover:bg-white transition-all shadow-lg hover:shadow-xl"
            >
              Espace membre
            </Link>
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl 
          border-2 border-[#E5DED5]/30
          bg-gradient-to-br from-[#4A4238]/60 via-[#4A4238]/40 to-transparent 
          backdrop-blur-md
          shadow-2xl
          hover:border-[#E5DED5]/40 transition-all duration-300">
          <img src={logoImage} alt="OMI Logo" className="w-32 sm:w-40 h-auto mx-auto mb-8 sm:mb-12 drop-shadow-2xl" />
          
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="block text-white">Observatoire du</span>
            <span className="block text-[#E5DED5]">Marché Immobilier</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-[#E5DED5]/90 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed">
            Une plateforme innovante pour analyser et comprendre le marché immobilier en temps réel.
            <span className="block mt-2">Accédez à des données précises et des insights stratégiques.</span>
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full bg-[#E5DED5] text-[#4A4238] hover:bg-white transition-all shadow-lg hover:shadow-xl"
            >
              Nous contacter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}