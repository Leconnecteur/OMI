import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('fr', fr);

interface DatePickerFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (id: string, value: string) => void;
  disabled?: boolean;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  id,
  label,
  value,
  onChange,
  disabled
}) => {
  const handleChange = (date: Date | null) => {
    onChange(id, date ? date.toISOString().split('T')[0] : '');
  };

  return (
    <div className="form-control w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <DatePicker
        id={id}
        selected={value ? new Date(value) : null}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        locale="fr"
        disabled={disabled}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        placeholderText="Sélectionnez une date"
        autoComplete="off"
      />
    </div>
  );
};

export default DatePickerField;
