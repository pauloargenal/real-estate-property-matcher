'use client';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';

interface DropdownProps {
  id: string;
  ariaLabel: string;
  placeholder: string;
  options: { value: string; element: JSX.Element }[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
  searchable?: boolean;
  containerClassName?: string;
  onChange?: (value: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  const {
    id,
    ariaLabel,
    placeholder,
    options,
    value,
    setValue,
    disabled = false,
    searchable = false,
    containerClassName = '',
    onChange
  } = props;

  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (!optionsVisible) {
      const validOption = options.find((option) => option.value === value);

      if (!validOption) {
        setValue('');
      }

      setSearchText('');
    }
  }, [options, value, setValue, optionsVisible]);

  function onSelect(event: any) {
    const target = event.target as HTMLElement;
    const targetWithDropdownValue = target.closest('[data-dropdown-value]') as HTMLElement;

    setValue(targetWithDropdownValue?.dataset.dropdownValue || '');
    setOptionsVisible(false);
    if (typeof onChange === 'function') {
      onChange(targetWithDropdownValue?.dataset.dropdownValue || '');
    }
  }

  let readOnly = false;
  let inputClassName = 'p-4 w-full';

  if (!searchable) {
    readOnly = true;
    inputClassName += ' cursor-pointer ';
  }

  return (
    <div
      className={`flex relative  ${containerClassName}`}
      onBlur={(event) => {
        const target = event.relatedTarget as HTMLElement;

        if (target?.dataset?.dropdownValue) {
          return;
        }

        setOptionsVisible(false);
      }}
    >
      <label key={id} htmlFor={id} className="flex flex-col w-full">
        <span className="font-medium text-black-70 mb-1">{ariaLabel}</span>
        <input
          id={id}
          name={id}
          aria-label={ariaLabel}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          className={` rounded-md ${inputClassName} `}
          type="text"
          autoComplete="off"
          onChange={(event) => {
            setOptionsVisible(true);
            setValue(event.target.value);
            setSearchText(event.target.value);
          }}
          onClick={() => {
            setOptionsVisible(!optionsVisible);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setOptionsVisible(!optionsVisible);
            }
          }}
        />
      </label>
      {optionsVisible && (
        <div
          className="absolute left-0 right-0 top-full z-10 flex flex-col pt-1"
          onClick={onSelect}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onSelect(event);
            }
          }}
        >
          {options
            .filter((option) => {
              if (!searchText) {
                return true;
              }

              return option.value.toLowerCase().includes(searchText.toLowerCase());
            })
            .map((option) => {
              return (
                <button
                  key={option.value}
                  type="button"
                  data-dropdown-value={option.value}
                  className="text-left py-2.5 px-2 my-0.5 text-sm bg-white text-black-70 rounded-lg drop-shadow-lg focus:outline-blue-100"
                >
                  {option.element}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
