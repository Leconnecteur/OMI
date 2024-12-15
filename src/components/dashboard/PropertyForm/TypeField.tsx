import React from 'react';
import { PropertyType } from '../../../types/property';

interface TypeFieldProps {
  value: PropertyType;
  onChange: (value: PropertyType) => void;
  disabled?: boolean;
}

const TypeField: React.FC<TypeFieldProps> = ({ value, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as PropertyType);
  };

  return (
    <div>
      <label htmlFor="type" className="block text-sm font-medium text-gray-700">
        Type de bien
      </label>
      <select
        id="type"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={value}
        onChange={handleChange}
        required
        disabled={disabled}
      >
        <option value="">Sélectionner...</option>
        <option value="apartment">Appartement</option>
        <option value="house">Maison</option>
        <option value="land">Terrain</option>
      </select>
    </div>
  );
};

export default TypeField;