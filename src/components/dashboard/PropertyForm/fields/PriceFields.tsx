import React from 'react';
import { Property } from '../../../../types/property';
import InputField from '../InputField';

interface PriceFieldsProps {
  formData: Partial<Property>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const PriceFields: React.FC<PriceFieldsProps> = ({ formData, onChange, disabled }) => {
  return (
    <>
      <InputField
        id="firstMandatePrice"
        label="Prix premier mandat (net vendeur)"
        type="number"
        value={formData.firstMandatePrice || 0}
        onChange={onChange}
        min={0}
        step={1000}
        disabled={disabled}
      />

      <InputField
        id="price"
        label="Prix de vente (€)"
        type="number"
        value={formData.price || 0}
        onChange={onChange}
        min={0}
        step={1000}
        disabled={disabled}
      />
    </>
  );
};

export default PriceFields;