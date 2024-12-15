import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/logo.png';
import { signIn } from '../../services/auth';
import BackgroundAnimation from '../BackgroundAnimation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Veuillez remplir tous les champs');
        return;
      }

      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/invalid-credential') {
        setError('Email ou mot de passe incorrect');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Trop de tentatives. Veuillez réessayer plus tard.');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A4238] via-[#8C7E6D] to-[#B4A99A] relative overflow-hidden">
      <BackgroundAnimation />
      <div className="max-w-md w-full mx-4 relative z-10">
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
                disabled={loading}
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
                disabled={loading}
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#4A4238] bg-[#E5DED5] hover:bg-[#E5DED5]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E5DED5] ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}