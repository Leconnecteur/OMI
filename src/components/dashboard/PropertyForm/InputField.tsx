import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  step?: number;
  pattern?: string;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  disabled,
  required = true,
  min,
  step,
  pattern,
  placeholder
}) => {
  // Gérer le focus pour les champs numériques
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (type === 'number' && value === 0) {
      e.target.value = '';
    }
  };

  // Gérer la perte de focus pour les champs numériques
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (type === 'number' && e.target.value === '') {
      e.target.value = '0';
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
        min={min}
        step={step}
        pattern={pattern}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;