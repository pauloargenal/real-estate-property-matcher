'use client';

import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';

import Snackbar from '../../../components/snackbar';
import { ValidationError } from '../../../utils/validation';
import { BuyerFilters, PropertyType, SellerSubmitError } from '../../types';
import Dropdown from '../../../components/dropdown';
import { getPropertyType } from '../../seller/utils/get-property-type';

interface BuyerFormProps {
  sellerLocale: Record<string, string>;
  commonLocale: Record<string, string>;
  handleFilters: (filters: BuyerFilters) => void;
  isLoading: boolean;
}

export default function BuyerForm({
  sellerLocale,
  commonLocale,
  handleFilters,
  isLoading
}: BuyerFormProps) {
  const propertyTypeOptions = [PropertyType.House, PropertyType.Apartment, PropertyType.Condo];

  const [location, setLocation] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const [propertyType, setPropertyType] = useState<string>('');
  const [submitError, setSubmitError] = useState<string | undefined>();

  const inputs = [
    {
      id: 'location',
      type: 'text',
      label: sellerLocale['input.location.label'],
      submitErrorType: SellerSubmitError.Location,
      placeholder: sellerLocale['input.location.placeholder'],
      value: location,
      inputErrorType: ValidationError.NoWhitespace,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setLocation(value);
        handleFilters({
          location: value,
          propertyType: propertyType as PropertyType,
          price
        });
      },
      inputTestId: 'location-input',
      errorTestid: 'location-error'
    },
    {
      id: 'price',
      type: 'text',
      label: sellerLocale['input.price.label'],
      submitErrorType: SellerSubmitError.Price,
      placeholder: sellerLocale['input.price.placeholder'],
      value: price,
      inputErrorType: ValidationError.Number,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target || {};
        setPrice(value);

        handleFilters({
          location,
          propertyType: propertyType as PropertyType,
          price: value
        });
      },
      inputTestId: 'price-input',
      errorTestid: 'price-error'
    }
  ];

  const handleReset = (event: MouseEvent<HTMLButtonElement> | FormEvent) => {
    event.preventDefault();
    setLocation('');
    setPropertyType('');
    setPrice('');
    handleFilters({
      location: '',
      propertyType: undefined,
      price: ''
    });
  };

  const handleFocus = () => {
    setSubmitError(undefined);
  };

  const storageOptionsWithElement = propertyTypeOptions.map((option) => ({
    value: option,
    element: <div>{getPropertyType(option)}</div>
  }));

  return (
    <form className="flex justify-between items-center  gap-4 p-4  w-full ">
      <div className="flex justify-start items-center gap-4">
        {inputs.map((input) => {
          const {
            id,
            type,

            label,
            placeholder,
            value,
            onChange,
            inputTestId
          } = input;

          return (
            <label key={id} htmlFor={id} className="flex flex-col ">
              <span className="font-medium text-black-70">{label}</span>
              <div className="relative" onFocus={handleFocus}>
                <input
                  name={id}
                  aria-labelledby={id}
                  type={type}
                  autoComplete="off"
                  placeholder={placeholder}
                  className="p-4 w-full rounded-md"
                  disabled={isLoading}
                  value={value}
                  onChange={onChange}
                  data-testid={inputTestId}
                />
              </div>
            </label>
          );
        })}

        <Dropdown
          setValue={setPropertyType}
          options={storageOptionsWithElement}
          value={propertyType}
          disabled={isLoading}
          id="propertyType"
          ariaLabel={sellerLocale['dropdown.type.label']}
          placeholder={sellerLocale['dropdown.type.placeholder']}
          searchable
          onChange={(value) => {
            handleFilters({
              location,
              propertyType: value as PropertyType,
              price
            });
          }}
        />
      </div>
      <div className="flex gap-4">
        <button
          type="reset"
          onClick={(event) => handleReset(event)}
          className="w-[200px] h-[56px] mt-8 rounded-md border border-blue-100 text-blue-100 hover:bg-blue-100  hover:text-white"
        >
          {commonLocale.reset}
        </button>
      </div>
      {submitError && (
        <div id="submit-error">
          <Snackbar message={submitError} type="error" />
        </div>
      )}
    </form>
  );
}
