import React from 'react';
import { Property } from '../../../../types/property';
import InputField from '../InputField';

interface DateFieldsProps {
  formData: Partial<Property>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const DateFields: React.FC<DateFieldsProps> = ({ formData, onChange, disabled }) => {
  return (
    <>
      <InputField
        id="firstMandateDate"
        label="Date premier mandat"
        type="date"
        value={formData.firstMandateDate || ''}
        onChange={onChange}
        disabled={disabled}
      />

      <InputField
        id="saleDate"
        label="Date de vente"
        type="date"
        value={formData.saleDate || ''}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};

export default DateFields;