import React from 'react';

interface BedroomsFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const BedroomsField: React.FC<BedroomsFieldProps> = ({ value, onChange, disabled }) => {
  return (
    <div>
      <label htmlFor="typology" className="block text-sm font-medium text-gray-700">
        Nombre de chambres
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
        {[...Array(9)].map((_, i) => (
          <option key={i + 1} value={`${i + 1}`}>
            {i + 1} {i === 0 ? 'chambre' : 'chambres'}
          </option>
        ))}
        <option value="9+">9+ chambres</option>
      </select>
    </div>
  );
};

export default BedroomsField;