import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/logo.png';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (email && password) {
        // Stocker l'état d'authentification
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
        window.location.reload(); // Forcer le rechargement pour mettre à jour l'état d'auth
      } else {
        setError('Veuillez remplir tous les champs');
      }
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A4238] via-[#8C7E6D] to-[#B4A99A]">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-2 border-[#E5DED5]/30 hover:border-[#E5DED5]/40 transition-all duration-300">
          <div className="text-center mb-8">
            <img src={logoImage} alt="OMI Logo" className="h-24 mx-auto mb-4" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#E5DED5]">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-[#E5DED5] border border-[#E5DED5]/30 rounded-lg 
                         text-[#4A4238] placeholder-[#4A4238]/60
                         focus:outline-none focus:ring-2 focus:ring-[#E5DED5]/50 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#E5DED5]">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-[#E5DED5] border border-[#E5DED5]/30 rounded-lg 
                         text-[#4A4238] placeholder-[#4A4238]/60
                         focus:outline-none focus:ring-2 focus:ring-[#E5DED5]/50 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="text-red-300 text-sm mt-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 text-[#4A4238] bg-[#E5DED5] rounded-lg font-medium
                       hover:bg-white transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-[#E5DED5]/50 focus:ring-offset-2 focus:ring-offset-[#4A4238]"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}