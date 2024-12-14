import React from 'react';
import { Property } from '../../../../types/property';
import SelectField from '../SelectField';
import { conditionOptions, occupancyOptions } from '../constants';

interface ConditionFieldsProps {
  formData: Partial<Property>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const ConditionFields: React.FC<ConditionFieldsProps> = ({ formData, onChange, disabled }) => {
  return (
    <>
      <SelectField
        id="condition"
        label="État du bien"
        value={formData.condition || ''}
        onChange={onChange}
        options={conditionOptions}
        disabled={disabled}
      />

      <SelectField
        id="occupancyStatus"
        label="État locatif"
        value={formData.occupancyStatus || ''}
        onChange={onChange}
        options={occupancyOptions}
        disabled={disabled}
      />
    </>
  );
};

export default ConditionFields;