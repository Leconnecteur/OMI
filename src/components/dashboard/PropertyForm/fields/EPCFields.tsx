import React from 'react';
import { Property } from '../../../../types/property';
import SelectField from '../SelectField';
import { epcRatingOptions } from '../constants';

interface EPCFieldsProps {
  formData: Partial<Property>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const EPCFields: React.FC<EPCFieldsProps> = ({ formData, onChange, disabled }) => {
  return (
    <>
      <SelectField
        id="epcElectricity"
        label="DPE électricité"
        value={formData.epcElectricity || ''}
        onChange={onChange}
        options={epcRatingOptions}
        disabled={disabled}
      />

      <SelectField
        id="epcGes"
        label="DPE GES"
        value={formData.epcGes || ''}
        onChange={onChange}
        options={epcRatingOptions}
        disabled={disabled}
      />
    </>
  );
};

export default EPCFields;