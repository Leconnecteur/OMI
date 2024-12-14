import React from 'react';
import { Property } from '../../../../types/property';
import InputField from '../InputField';
import SelectField from '../SelectField';
import { parkingOptions, exteriorOptions } from '../constants';

interface BuildingFieldsProps {
  formData: Partial<Property>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled?: boolean;
}

const BuildingFields: React.FC<BuildingFieldsProps> = ({ formData, onChange, disabled }) => {
  return (
    <>
      <SelectField
        id="parkingSpots"
        label="Nombre de parkings"
        value={String(formData.parkingSpots || '')}
        onChange={onChange}
        options={parkingOptions}
        disabled={disabled}
      />

      {formData.type === 'apartment' && (
        <InputField
          id="floor"
          label="Étage / Nombre d'étages"
          type="text"
          value={formData.floor || ''}
          onChange={onChange}
          pattern="\d+\/\d+"
          disabled={disabled}
        />
      )}

      <InputField
        id="constructionYear"
        label="Année de construction"
        type="text"
        value={formData.constructionYear || ''}
        onChange={onChange}
        disabled={disabled}
      />

      {formData.type === 'apartment' && (
        <SelectField
          id="exterior"
          label="Type d'extérieur"
          value={formData.exterior || 'none'}
          onChange={onChange}
          options={exteriorOptions}
          disabled={disabled}
        />
      )}

      {formData.type === 'house' && (
        <InputField
          id="plotSurface"
          label="Superficie de la parcelle (m²)"
          type="number"
          value={formData.plotSurface || 0}
          onChange={onChange}
          min={0}
          step={1}
          disabled={disabled}
        />
      )}

      <InputField
        id="surface"
        label="Surface habitable (m²)"
        type="number"
        value={formData.surface || 0}
        onChange={onChange}
        min={0}
        step={0.5}
        disabled={disabled}
      />
    </>
  );
};

export default BuildingFields;