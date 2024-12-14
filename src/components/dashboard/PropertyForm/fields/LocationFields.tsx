import React from 'react';
import { Property } from '../../../../types/property';
import InputField from '../InputField';

interface LocationFieldsProps {
  formData: Partial<Property>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const LocationFields: React.FC<LocationFieldsProps> = ({ formData, onChange, disabled }) => {
  return (
    <>
      <InputField
        id="address"
        label="Adresse du bien"
        type="text"
        value={formData.address || ''}
        onChange={onChange}
        disabled={disabled}
      />

      <InputField
        id="city"
        label="Ville"
        type="text"
        value={formData.city || ''}
        onChange={onChange}
        disabled={disabled}
      />

      <InputField
        id="district"
        label="Quartier"
        type="text"
        value={formData.district || ''}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};

export default LocationFields;