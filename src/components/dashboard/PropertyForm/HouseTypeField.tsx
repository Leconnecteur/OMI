import React from 'react';
import { houseTypeOptions } from './constants';

interface HouseTypeFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const HouseTypeField: React.FC<HouseTypeFieldProps> = ({ value, onChange, disabled }) => {
  return (
    <div>
      <label htmlFor="houseType" className="block text-sm font-medium text-gray-700">
        Type de maison
      </label>
      <select
        id="houseType"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
      >
        <option value="">Sélectionner...</option>
        {houseTypeOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default HouseTypeField;