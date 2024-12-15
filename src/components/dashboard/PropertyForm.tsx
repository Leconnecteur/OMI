import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { submitProperty } from '../../services/properties';
import ErrorMessage from './ErrorMessage';
import TypeField from './PropertyForm/TypeField';
import TypologyField from './PropertyForm/TypologyField';
import BedroomsField from './PropertyForm/BedroomsField';
import SelectField from './PropertyForm/SelectField';
import InputField from './PropertyForm/InputField';
import DatePickerField from './PropertyForm/DatePickerField';
import { Property, PropertyType } from '../../types/property';

const initialFormData: Partial<Property> = {
  type: '',
  typology: '',
  price: 0,
  saleDate: new Date().toISOString().split('T')[0],
  firstMandateDate: new Date().toISOString().split('T')[0],
  firstMandatePrice: 0,
  address: '',
  district: '',
  city: '',
  parkingSpots: 0,
  floor: null,
  constructionYear: null,
  exterior: null,
  exposure: null,
  condition: 'good',
  epcElectricity: 'D',
  epcGes: 'D',
  occupancyStatus: 'free',
  surface: 0,
  plotSurface: null,
  topography: null,
  sanitation: null,
  servicing: null,
  houseType: null
};

const parkingOptions = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4+', label: '4 ou plus' }
];

const conditionOptions = [
  { value: 'to-renovate', label: 'À rénover' },
  { value: 'good', label: 'Bon état' },
  { value: 'new', label: 'Neuf' }
];

const occupancyOptions = [
  { value: 'free', label: 'Libre' },
  { value: 'rented', label: 'Loué' },
  { value: 'primary-residence', label: 'Résidence principale' }
];

const exteriorOptions = [
  { value: 'balcony', label: 'Balcon' },
  { value: 'terrace', label: 'Terrasse' },
  { value: 'garden', label: 'Jardin' },
  { value: 'none', label: 'Aucun' }
];

const exposureOptions = [
  { value: 'north', label: 'Nord' },
  { value: 'south', label: 'Sud' },
  { value: 'east', label: 'Est' },
  { value: 'west', label: 'Ouest' },
  { value: 'north-east', label: 'Nord-Est' },
  { value: 'north-west', label: 'Nord-Ouest' },
  { value: 'south-east', label: 'Sud-Est' },
  { value: 'south-west', label: 'Sud-Ouest' }
];

const epcOptions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' }
];

const topographyOptions = [
  { value: 'flat', label: 'Plat' },
  { value: 'slope', label: 'En pente' }
];

const sanitationOptions = [
  { value: 'collective', label: 'Collectif' },
  { value: 'individual', label: 'Individuel' }
];

const servicingOptions = [
  { value: 'serviced', label: 'Viabilisé' },
  { value: 'not-serviced', label: 'Non viabilisé' }
];

const houseTypeOptions = [
  { value: 'individual', label: 'Individuelle' },
  { value: 'individual-condo', label: 'Individuelle en copropriété' },
  { value: 'semi-detached', label: 'Mitoyenne' },
  { value: 'semi-detached-condo', label: 'Mitoyenne en copropriété' }
];

const typologyOptions = [
  { value: 'T1', label: 'T1' },
  { value: 'T2', label: 'T2' },
  { value: 'T3', label: 'T3' },
  { value: 'T4', label: 'T4' },
  { value: 'T5', label: 'T5' },
  { value: 'T6+', label: 'T6 ou plus' }
];

const PropertyForm: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<Property>>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setFormData(initialFormData);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error('Vous devez être connecté pour soumettre un bien');
      }

      const propertyData = {
        ...formData,
        userId: user.uid,
      };

      await submitProperty(propertyData as Property);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name: keyof Property, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage message={error} />}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Succès!</strong>
          <span className="block sm:inline"> Le bien a été enregistré avec succès.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TypeField 
            value={formData.type as PropertyType} 
            onChange={(value) => handleInputChange('type', value)} 
          />
          
          {/* Champs spécifiques aux maisons */}
          {formData.type === 'house' && (
            <>
              <SelectField
                label="Type de maison"
                value={formData.houseType || ''}
                options={houseTypeOptions}
                onChange={(value) => handleInputChange('houseType', value)}
                required
              />
              <InputField
                label="Surface habitable"
                type="number"
                value={formData.surface || ''}
                onChange={(value) => handleInputChange('surface', value)}
                required
              />
              <InputField
                label="Surface du terrain"
                type="number"
                value={formData.plotSurface || ''}
                onChange={(value) => handleInputChange('plotSurface', value)}
                required
              />
              <SelectField
                label="État du bien"
                value={formData.condition || 'good'}
                options={conditionOptions}
                onChange={(value) => handleInputChange('condition', value)}
                required
              />
              <SelectField
                label="DPE Électricité"
                value={formData.epcElectricity || ''}
                options={epcOptions}
                onChange={(value) => handleInputChange('epcElectricity', value)}
                required
              />
              <SelectField
                label="DPE GES"
                value={formData.epcGes || ''}
                options={epcOptions}
                onChange={(value) => handleInputChange('epcGes', value)}
                required
              />
              <InputField
                label="Année de construction"
                type="number"
                value={formData.constructionYear || ''}
                onChange={(value) => handleInputChange('constructionYear', value)}
                required
              />
              <SelectField
                label="Statut d'occupation"
                value={formData.occupancyStatus || ''}
                options={occupancyOptions}
                onChange={(value) => handleInputChange('occupancyStatus', value)}
                required
              />
            </>
          )}

          {/* Champs spécifiques aux appartements */}
          {formData.type === 'apartment' && (
            <>
              <TypologyField 
                value={formData.typology} 
                onChange={(value) => handleInputChange('typology', value)} 
                required
              />
              <BedroomsField 
                value={formData.bedrooms} 
                onChange={(value) => handleInputChange('bedrooms', value)} 
                required
              />
              <InputField
                label="Étage"
                type="number"
                value={formData.floor || ''}
                onChange={(value) => handleInputChange('floor', value)}
                required
              />
              <SelectField
                label="Stationnement"
                value={formData.parkingSpots?.toString() || '0'}
                options={parkingOptions}
                onChange={(value) => handleInputChange('parkingSpots', parseInt(value))}
                required
              />
              <InputField
                label="Surface"
                type="number"
                value={formData.surface || ''}
                onChange={(value) => handleInputChange('surface', value)}
                required
              />
              <SelectField
                label="État du bien"
                value={formData.condition || ''}
                options={conditionOptions}
                onChange={(value) => handleInputChange('condition', value)}
                required
              />
              <SelectField
                label="Extérieur"
                value={formData.exterior || ''}
                options={exteriorOptions}
                onChange={(value) => handleInputChange('exterior', value)}
                required
              />
              <SelectField
                label="Exposition"
                value={formData.exposure || ''}
                options={exposureOptions}
                onChange={(value) => handleInputChange('exposure', value)}
                required
              />
              <InputField
                label="Année de construction"
                type="number"
                value={formData.constructionYear || ''}
                onChange={(value) => handleInputChange('constructionYear', value)}
                required
              />
              <SelectField
                label="DPE Électricité"
                value={formData.epcElectricity || ''}
                options={epcOptions}
                onChange={(value) => handleInputChange('epcElectricity', value)}
                required
              />
              <SelectField
                label="DPE GES"
                value={formData.epcGes || ''}
                options={epcOptions}
                onChange={(value) => handleInputChange('epcGes', value)}
                required
              />
              <SelectField
                label="Statut d'occupation"
                value={formData.occupancyStatus || ''}
                options={occupancyOptions}
                onChange={(value) => handleInputChange('occupancyStatus', value)}
                required
              />
            </>
          )}

          {/* Champs spécifiques aux terrains */}
          {formData.type === 'land' && (
            <>
              <InputField
                label="Surface du terrain"
                type="number"
                value={formData.plotSurface || ''}
                onChange={(value) => handleInputChange('plotSurface', value)}
                required
              />
              <SelectField
                label="Topographie"
                value={formData.topography || ''}
                options={topographyOptions}
                onChange={(value) => handleInputChange('topography', value)}
                required
              />
              <SelectField
                label="Assainissement"
                value={formData.sanitation || ''}
                options={sanitationOptions}
                onChange={(value) => handleInputChange('sanitation', value)}
                required
              />
              <SelectField
                label="Viabilisation"
                value={formData.servicing || ''}
                options={servicingOptions}
                onChange={(value) => handleInputChange('servicing', value)}
                required
              />
            </>
          )}
        </div>

        <div className="space-y-6">
          <DatePickerField
            label="Date de vente"
            value={formData.saleDate || ''}
            onChange={(value) => handleInputChange('saleDate', value)}
          />

          <DatePickerField
            label="Date du premier mandat"
            value={formData.firstMandateDate || ''}
            onChange={(value) => handleInputChange('firstMandateDate', value)}
          />

          <InputField
            label="Prix de vente (€)"
            type="number"
            value={formData.price || ''}
            onChange={(value) => handleInputChange('price', value ? parseInt(value) : 0)}
          />

          <InputField
            label="Prix du premier mandat (€)"
            type="number"
            value={formData.firstMandatePrice || ''}
            onChange={(value) => handleInputChange('firstMandatePrice', value ? parseInt(value) : 0)}
          />

          <InputField
            label="Surface habitable (m²)"
            type="number"
            value={formData.surface || ''}
            onChange={(value) => handleInputChange('surface', value ? parseInt(value) : 0)}
          />

          {(formData.type === 'house' || formData.type === 'land') && (
            <InputField
              label="Surface du terrain (m²)"
              type="number"
              value={formData.plotSurface || ''}
              onChange={(value) => handleInputChange('plotSurface', value ? parseInt(value) : null)}
            />
          )}

          <InputField
            label="Adresse"
            type="text"
            value={formData.address || ''}
            onChange={(value) => handleInputChange('address', value)}
          />

          <InputField
            label="Quartier"
            type="text"
            value={formData.district || ''}
            onChange={(value) => handleInputChange('district', value)}
          />

          <InputField
            label="Ville"
            type="text"
            value={formData.city || ''}
            onChange={(value) => handleInputChange('city', value)}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#4A4238] text-white px-4 py-2 rounded-md hover:bg-[#4A4238]/90 focus:outline-none focus:ring-2 focus:ring-[#4A4238] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;