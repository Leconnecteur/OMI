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
import { TabsList, TabsTrigger, TabsContent } from './Tabs';
import PropertyHistory from './PropertyHistory';

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
  { value: 'to-refresh', label: 'À rafraîchir' },
  { value: 'good', label: 'Bon' },
  { value: 'very-good', label: 'Très bon' },
  { value: 'renovated', label: 'Rénové' },
  { value: 'new', label: 'Neuf' },
  { value: 'high-end', label: 'Haut de gamme' },
  { value: 'vefa', label: 'VEFA' }
];

const exteriorOptions = [
  { value: 'none', label: 'Aucun' },
  { value: 'garden', label: 'Jardin' },
  { value: 'terrace', label: 'Terrasse' },
  { value: 'balcon', label: 'Balcon' }
];

const exposureOptions = [
  { value: 'N', label: 'Nord' },
  { value: 'NE', label: 'Nord-Est' },
  { value: 'E', label: 'Est' },
  { value: 'SE', label: 'Sud-Est' },
  { value: 'S', label: 'Sud' },
  { value: 'SO', label: 'Sud-Ouest' },
  { value: 'O', label: 'Ouest' },
  { value: 'NO', label: 'Nord-Ouest' }
];

const epcRatingOptions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' }
];

const occupancyOptions = [
  { value: 'free', label: 'Libre' },
  { value: 'occupied', label: 'Occupé' }
];

const houseTypeOptions = [
  { value: 'individual', label: 'Maison individuelle' },
  { value: 'individual-condo', label: 'Maison individuelle en copro' },
  { value: 'semi-detached', label: 'Maison mitoyenne' },
  { value: 'semi-detached-condo', label: 'Maison mitoyenne en copro' }
];

const topographyOptions = [
  { value: 'flat', label: 'Plate' },
  { value: 'steep-slope', label: 'Pente forte' },
  { value: 'gentle-slope', label: 'Pente douce' }
];

const sanitationOptions = [
  { value: 'individual', label: 'Individuelle' },
  { value: 'collective', label: 'Collectif' }
];

const servicingOptions = [
  { value: 'yes', label: 'Oui' },
  { value: 'no', label: 'Non' }
];

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
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue lors de la soumission');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string, dateValue?: string) => {
    if (typeof e === 'string' && dateValue) {
      // Gestion des dates
      setFormData(prev => ({
        ...prev,
        [e]: dateValue
      }));
    } else if (typeof e !== 'string') {
      const { id, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [id]: ['price', 'surface', 'firstMandatePrice', 'parkingSpots', 'plotSurface'].includes(id)
          ? value === '' ? null : Number(value)
          : value === '' ? null : value,
        ...(id === 'type' && { 
          typology: '', 
          exterior: null, 
          houseType: null, 
          exposure: null,
          // Réinitialiser les champs spécifiques aux terrains si ce n'est pas un terrain
          ...(value !== 'land' && {
            topography: null,
            sanitation: null,
            servicing: null
          })
        })
      }));
    }
  };

  return (
    <div>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="form">Saisie</TabsTrigger>
        <TabsTrigger value="history">Historique</TabsTrigger>
      </TabsList>
      <TabsContent value="form">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TypeField
              value={formData.type || ''}
              onChange={handleInputChange}
              disabled={status === 'submitting'}
            />

            {formData.type === 'house' && (
              <SelectField
                id="houseType"
                label="Type de maison"
                value={formData.houseType || ''}
                options={houseTypeOptions}
                onChange={handleInputChange}
                disabled={status === 'submitting'}
              />
            )}

            {formData.type && (
              formData.type === 'house' ? (
                <BedroomsField
                  value={formData.typology || ''}
                  onChange={handleInputChange}
                  disabled={status === 'submitting'}
                />
              ) : (
                formData.type !== 'land' && (
                  <TypologyField
                    value={formData.typology || ''}
                    onChange={handleInputChange}
                    disabled={status === 'submitting'}
                  />
                )
              )
            )}

            <DatePickerField
              id="firstMandateDate"
              label="Date premier mandat"
              value={formData.firstMandateDate}
              onChange={handleInputChange}
              disabled={status === 'submitting'}
            />

            <InputField
              id="firstMandatePrice"
              label="Prix premier mandat (€)"
              type="number"
              value={formData.firstMandatePrice || 0}
              onChange={handleInputChange}
              min={0}
              disabled={status === 'submitting'}
              placeholder="Net vendeur"
            />

            <InputField
              id="price"
              label="Prix de vente (€)"
              type="number"
              value={formData.price || 0}
              onChange={handleInputChange}
              min={0}
              disabled={status === 'submitting'}
              placeholder="Net vendeur"
            />

            <DatePickerField
              id="saleDate"
              label="Date du compromis"
              value={formData.saleDate}
              onChange={handleInputChange}
              disabled={status === 'submitting'}
            />

            <InputField
              id="address"
              label="Adresse du bien"
              type="text"
              value={formData.address || ''}
              onChange={handleInputChange}
              disabled={status === 'submitting'}
            />

            <InputField
              id="district"
              label="Quartier"
              type="text"
              value={formData.district || ''}
              onChange={handleInputChange}
              disabled={status === 'submitting'}
            />

            <InputField
              id="city"
              label="Ville"
              type="text"
              value={formData.city || ''}
              onChange={handleInputChange}
              disabled={status === 'submitting'}
            />

            {formData.type && formData.type !== 'land' && (
              <>
                <SelectField
                  id="parkingSpots"
                  label="Nombre de parkings"
                  value={String(formData.parkingSpots || '0')}
                  options={parkingOptions}
                  onChange={handleInputChange}
                  disabled={status === 'submitting'}
                />

                <InputField
                  id="constructionYear"
                  label="Année de construction"
                  type="text"
                  value={formData.constructionYear || ''}
                  onChange={handleInputChange}
                  disabled={status === 'submitting'}
                />

                <SelectField
                  id="condition"
                  label="État du bien"
                  value={formData.condition || 'good'}
                  options={conditionOptions}
                  onChange={handleInputChange}
                  disabled={status === 'submitting'}
                />

                <SelectField
                  id="epcElectricity"
                  label="DPE Électricité"
                  value={formData.epcElectricity || 'D'}
                  options={epcRatingOptions}
                  onChange={handleInputChange}
                  disabled={status === 'submitting'}
                />

                <SelectField
                  id="epcGes"
                  label="DPE GES"
                  value={formData.epcGes || 'D'}
                  options={epcRatingOptions}
                  onChange={handleInputChange}
                  disabled={status === 'submitting'}
                />

                <SelectField
                  id="occupancyStatus"
                  label="État locatif"
                  value={formData.occupancyStatus || 'free'}
                  options={occupancyOptions}
                  onChange={handleInputChange}
                  disabled={status === 'submitting'}
                />

                <InputField
                  id="surface"
                  label="Surface habitable (m²)"
                  type="number"
                  value={formData.surface || 0}
                  onChange={handleInputChange}
                  min={0}
                  disabled={status === 'submitting'}
                />
              </>
            )}

            {formData.type === 'land' && (
              <>
                <InputField
                  id="surface"
                  label="Surface du terrain (m²)"
                  type="number"
                  value={formData.surface || 0}
                  onChange={handleInputChange}
                  min={0}
                  disabled={status === 'submitting'}
                />

                <SelectField
                  id="topography"
                  label="Topographie"
                  value={formData.topography || 'flat'}
                  options={topographyOptions}
                  onChange={handleInputChange}
                  disabled={status === 'submitting'}
                />

                <SelectField
                  id="sanitation"
                  label="Assainissement"
                  value={formData.sanitation || 'individual'}
                  options={sanitationOptions}
                  onChange={handleInputChange}
                  disabled={status === 'submitting'}
                />

                <SelectField
                  id="servicing"
                  label="Viabilisé"
                  value={formData.servicing || 'no'}
                  options={servicingOptions}
                  onChange={handleInputChange}
                  disabled={status === 'submitting'}
                />
              </>
            )}

            {formData.type === 'apartment' && (
              <InputField
                id="floor"
                label="Étage (format: étage/nombre total d'étages)"
                type="text"
                value={formData.floor || ''}
                onChange={handleInputChange}
                disabled={status === 'submitting'}
                placeholder="Ex: 2/4"
                pattern="\d+\/\d+"
                title="Format attendu: numéro d'étage/nombre total d'étages (ex: 2/4)"
              />
            )}

            {formData.type === 'house' && (
              <InputField
                id="plotSurface"
                label="Surface de la parcelle"
                type="number"
                value={formData.plotSurface || 0}
                onChange={handleInputChange}
                min={0}
                disabled={status === 'submitting'}
                placeholder="en m²"
              />
            )}
          </div>

          {status === 'success' && (
            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded">
              Bien immobilier ajouté avec succès !
            </div>
          )}

          {status === 'error' && (
            <ErrorMessage message={errorMessage} />
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-[#4A4238] hover:bg-[#4A4238]/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A4238]"
          >
            {status === 'submitting' ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </form>
      </TabsContent>
      <TabsContent value="history">
        <PropertyHistory />
      </TabsContent>
    </div>
  );
}