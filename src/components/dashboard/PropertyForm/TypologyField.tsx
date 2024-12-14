import React from 'react';

interface TypologyFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const TypologyField: React.FC<TypologyFieldProps> = ({ value, onChange, disabled }) => {
  return (
    <div>
      <label htmlFor="typology" className="block text-sm font-medium text-gray-700">
        Typologie
      </label>
      <select
        id="typology"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
      >
        <option value="">Sélectionner...</option>
        <option value="T1">T1</option>
        <option value="T2">T2</option>
        <option value="T3">T3</option>
        <option value="T4">T4</option>
        <option value="T5+">T5+</option>
      </select>
    </div>
  );
};

export default TypologyField;