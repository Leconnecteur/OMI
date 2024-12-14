import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { submitProperty } from '../../../services/properties';
import { Property } from '../../../types/property';
import PropertyFormFields from './PropertyFormFields';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from '../ErrorMessage';

const initialFormData: Partial<Property> = {
  type: '',
  houseType: undefined,
  typology: '',
  price: 0,
  saleDate: new Date().toISOString().split('T')[0],
  firstMandateDate: new Date().toISOString().split('T')[0],
  firstMandatePrice: 0,
  address: '',
  city: '',
  district: '',
  parkingSpots: 0,
  floor: '',
  constructionYear: '',
  exterior: 'none',
  condition: 'good',
  epcElectricity: 'D',
  epcGes: 'D',
  occupancyStatus: 'free',
  surface: 0,
  plotSurface: 0
};

export default function PropertyForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) {
      setStatus('error');
      setErrorMessage('Vous devez être connecté pour soumettre une propriété');
      return;
    }

    try {
      setStatus('submitting');
      setErrorMessage('');
      await submitProperty(formData as Property, user.uid);
      setStatus('success');
      setFormData(initialFormData);
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue lors de la soumission');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: ['price', 'surface', 'firstMandatePrice', 'parkingSpots', 'plotSurface'].includes(id) 
        ? Number(value) 
        : value,
      ...(id === 'type' && { typology: '', exterior: 'none', houseType: undefined })
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
      <PropertyFormFields
        formData={formData}
        onChange={handleInputChange}
        disabled={status === 'submitting'}
      />

      {status === 'success' && <SuccessMessage />}
      {status === 'error' && <ErrorMessage message={errorMessage} />}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-[#4A4238] hover:bg-[#4A4238]/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A4238]"
      >
        {status === 'submitting' ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </form>
  );
}