'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { DropdownComponentProps } from '@/types';

const Dropdown: React.FC<DropdownComponentProps> = ({
                                                      options,
                                                      placeholder = 'Seçiniz',
                                                      onChange,
                                                      value,
                                                    }) => {
  // Use the controlled value prop if provided, otherwise use internal state
  const [internalValue, setInternalValue] = useState<string | number | null>(null);

  // Sync internal state with controlled value prop when it changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value?.value ?? null);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(
        (option) => String(option.value) === selectedValue
    );

    if (selectedOption) {
      setInternalValue(selectedOption.value);
      onChange(selectedOption);
    } else {
      setInternalValue(null);
      onChange({ value: '', label: '' }); // Reset case
    }
  };

  // Use controlled value if provided, otherwise use internal state
  const displayValue = value !== undefined ? value?.value : internalValue;

  return (
      <div className="relative w-full">
        <select
            value={displayValue ?? ''}
            onChange={handleChange}
            className="w-full appearance-none rounded border border-stroke bg-transparent bg-white px-5 py-3 outline-none transition-all duration-300 focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            {placeholder}
          </option>
          {options.map((option) => {
            if (option.value === undefined || option.label === undefined) {
              return null;
            }

            return (
                <option
                    key={`${option.value}-${option.label}`}
                    value={option.value}
                    className="text-body dark:text-bodydark"
                >
                  {option.label}
                </option>
            );
          })}
        </select>

        <span className="absolute right-4 top-1/2 z-50 -translate-y-1/2 dark:text-white">
        <ChevronDown />
      </span>
      </div>
  );
};

export default Dropdown;