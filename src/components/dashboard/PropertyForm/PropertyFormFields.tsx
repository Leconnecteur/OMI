import React from 'react';
import { Property } from '../../../types/property';
import TypeField from './fields/TypeField';
import HouseTypeField from './fields/HouseTypeField';
import BedroomsField from './fields/BedroomsField';
import TypologyField from './fields/TypologyField';
import DateFields from './fields/DateFields';
import PriceFields from './fields/PriceFields';
import LocationFields from './fields/LocationFields';
import BuildingFields from './fields/BuildingFields';
import ConditionFields from './fields/ConditionFields';
import EPCFields from './fields/EPCFields';

interface PropertyFormFieldsProps {
  formData: Partial<Property>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled?: boolean;
}

const PropertyFormFields: React.FC<PropertyFormFieldsProps> = ({
  formData,
  onChange,
  disabled
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TypeField
        value={formData.type || ''}
        onChange={onChange}
        disabled={disabled}
      />

      {formData.type === 'house' && (
        <HouseTypeField
          value={formData.houseType || ''}
          onChange={onChange}
          disabled={disabled}
        />
      )}

      {formData.type && (
        formData.type === 'house' ? (
          <BedroomsField
            value={formData.typology || ''}
            onChange={onChange}
            disabled={disabled}
          />
        ) : (
          formData.type !== 'land' && (
            <TypologyField
              value={formData.typology || ''}
              onChange={onChange}
              disabled={disabled}
            />
          )
        )
      )}

      <DateFields
        formData={formData}
        onChange={onChange}
        disabled={disabled}
      />

      <PriceFields
        formData={formData}
        onChange={onChange}
        disabled={disabled}
      />

      <LocationFields
        formData={formData}
        onChange={onChange}
        disabled={disabled}
      />

      <BuildingFields
        formData={formData}
        onChange={onChange}
        disabled={disabled}
      />

      <ConditionFields
        formData={formData}
        onChange={onChange}
        disabled={disabled}
      />

      <EPCFields
        formData={formData}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default PropertyFormFields;