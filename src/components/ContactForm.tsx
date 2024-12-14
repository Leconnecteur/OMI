import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { submitContactForm } from '../services/contact';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Contactez-nous
            </h2>
            <p className="text-gray-600 mb-8">
              Vous souhaitez en savoir plus sur nos services ? N'hésitez pas à nous contacter.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-6 w-6 text-[#4A4238] mr-3" />
                <a 
                  href="mailto:contact@omi.immo" 
                  className="text-gray-700 hover:text-[#8C7E6D] transition-colors"
                >
                  contact@omi.immo
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-[#4A4238] mr-3" />
                <a 
                  href="tel:+33787950535" 
                  className="text-gray-700 hover:text-[#8C7E6D] transition-colors"
                >
                  +33 7 87 95 05 35
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-[#4A4238] mr-3" />
                <a 
                  href="https://maps.google.com/?q=Anglet,France" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#8C7E6D] transition-colors"
                >
                  Anglet, France
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {errorMessage}
                </div>
              )}
              
              {status === 'success' && (
                <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
                  Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8C7E6D] focus:ring-[#8C7E6D]"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8C7E6D] focus:ring-[#8C7E6D]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8C7E6D] focus:ring-[#8C7E6D]"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4A4238] hover:bg-[#8C7E6D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8C7E6D] disabled:opacity-50 transition-colors"
              >
                {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}