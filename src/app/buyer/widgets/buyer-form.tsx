'use client';

import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';

import Snackbar from '../../../components/snackbar';
import { validationSchema, ValidationError, getValidationError } from '../../../utils/validation';
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
  const [inputError, setInputError] = useState<ValidationError>();

  const inputsNotEmpty = [location, price, propertyType].every(
    (input) => input !== undefined && input !== null && String(input).trim() !== ''
  );

  const maySubmit = !isLoading && !inputError;

  const buttonLabel = isLoading ? commonLocale.loading : commonLocale.submit;

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
        const { value } = event.target || {};
        setLocation(value);
        const result = validationSchema.noWhitespace.safeParse(value);
        const locationInputError = getValidationError(result, [ValidationError.Empty]);
        setInputError(locationInputError);
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
        setPrice(event.target.value);
        const result = validationSchema.number.safeParse(value);
        const locationInputError = getValidationError(result, [
          ValidationError.Number,
          ValidationError.NoWhitespace
        ]);
        setInputError(locationInputError);
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formDataObject = Object.fromEntries(formData.entries());

    const filter: BuyerFilters = {
      location: String(formDataObject.location),
      price: String(formDataObject.price),
      propertyType: formDataObject.propertyType as PropertyType
    };

    handleFilters(filter);
  }

  const handleFocus = () => {
    setSubmitError(undefined);
  };

  const storageOptionsWithElement = propertyTypeOptions.map((option) => ({
    value: option,
    element: <div>{getPropertyType(option)}</div>
  }));

  return (
    <form className="flex justify-between items-center  gap-4 p-4  w-full " onSubmit={onSubmit}>
      <div className="flex justify-start items-center gap-4">
        {inputs.map((input) => {
          const {
            id,
            type,
            submitErrorType,
            label,
            placeholder,
            value,
            onChange,
            inputErrorType,
            inputTestId,
            errorTestid
          } = input;
          let inputClassName = 'p-4 w-full rounded-md';

          const hasInputError = inputError && inputError === inputErrorType;
          const hasSubmitError = submitError && submitError === submitErrorType;
          const hasError = hasInputError || hasSubmitError;
          if (hasError) {
            inputClassName = `${inputClassName} bg-cienna-10`;
          }

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
                  className={inputClassName}
                  disabled={isLoading}
                  value={value}
                  onChange={onChange}
                  data-testid={inputTestId}
                />
              </div>
              {hasInputError && (
                <span className="font-medium text-sm text-cienna-100 mt-1" id={errorTestid}>
                  {sellerLocale[`validation.${inputError}`]}
                </span>
              )}
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
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={!maySubmit}
          className=" text-white bg-blue-100  w-[200px] h-[56px]  mt-8 rounded-md"
        >
          {buttonLabel}
        </button>
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
          <Snackbar message={submitError} />
        </div>
      )}
    </form>
  );
}
