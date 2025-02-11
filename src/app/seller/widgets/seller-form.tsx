'use client';

import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';

import Snackbar from '../../../components/snackbar';
import { validationSchema, ValidationError, getValidationError } from '../../../utils/validation';
import { PropertyType, SellerSubmitError, SellerRequest } from '../../types';
import Dropdown from '../../../components/dropdown';
import PropertiesService from '../../../services/seller-services';
import { getPropertyType } from '../utils/get-property-type';

interface LogInFormProps {
  sellerLocale: Record<string, string>;
  commonLocale: Record<string, string>;
}

export default function SellerForm({ sellerLocale, commonLocale }: LogInFormProps) {
  const propertyTypeOptions = [PropertyType.House, PropertyType.Apartment, PropertyType.Condo];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const [propertyType, setPropertyType] = useState<string>('');
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();
  const [inputError, setInputError] = useState<ValidationError>();
  const showSnackBar = successMessage || submitError;
  const snackBarType = submitError ? 'error' : 'success';
  const inputsNotEmpty = [title, location, price, propertyType].every(
    (input) => input !== undefined && input !== null && String(input).trim() !== ''
  );

  const maySubmit = !isLoading && !inputError && inputsNotEmpty;

  const buttonLabel = isLoading ? commonLocale.loading : commonLocale.submit;

  const inputs = [
    {
      id: 'title',
      type: 'text',
      label: sellerLocale['input.title.label'],
      submitErrorType: SellerSubmitError.Title,
      placeholder: sellerLocale['input.title.placeholder'],
      value: title,
      inputErrorType: ValidationError.NoWhitespace,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target || {};
        setTitle(value);
        const result = validationSchema.noWhitespace.safeParse(value);
        const titleInputError = getValidationError(result, [ValidationError.Empty]);
        setInputError(titleInputError);
      },
      inputTestId: 'title-input',
      errorTestid: 'title-error'
    },
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

  const resetForm = (event: MouseEvent<HTMLButtonElement> | FormEvent) => {
    event.preventDefault();
    setTitle('');
    setLocation('');
    setPropertyType('');
    setPrice('');
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setIsLoading(true);
      const formData = new FormData(event.target as HTMLFormElement);
      const formDataObject = Object.fromEntries(formData.entries());

      const request: SellerRequest = {
        title: String(formDataObject.title),
        location: String(formDataObject.location),
        price: Number(formDataObject.price),
        propertyType: formDataObject.propertyType as PropertyType
      };
      await PropertiesService.createProperties(request);
      setSuccessMessage(sellerLocale['request.submit.success.generic']);
      resetForm(event);
      setIsLoading(false);
    } catch (err) {
      setSubmitError(sellerLocale['request.submit.error.generic']);
      setIsLoading(false);
    }
  }

  const handleFocus = () => {
    setSubmitError(undefined);
  };

  const storageOptionsWithElement = propertyTypeOptions.map((option) => ({
    value: option,
    element: <div>{getPropertyType(option)}</div>
  }));

  return (
    <form
      className="flex-col flex-1 justify-center  items-center rounded-md p-4 mx-32 "
      onSubmit={onSubmit}
      data-testid="login-form"
    >
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
          <label key={id} htmlFor={id} className="flex flex-col mb-4">
            <span className="font-medium text-black-70 mb-1">{label}</span>
            <div className="relative" onFocus={handleFocus}>
              <input
                name={id}
                aria-labelledby={id}
                type={type}
                required
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
        containerClassName="mb-4"
        searchable
      />
      <button
        type="submit"
        disabled={!maySubmit}
        className=" text-white bg-blue-100 mb-4 w-full py-2 rounded-md"
      >
        {buttonLabel}
      </button>
      {showSnackBar && (
        <div id="submit-error">
          <Snackbar message={submitError || successMessage || ''} type={snackBarType} />
        </div>
      )}
    </form>
  );
}
