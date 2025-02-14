'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DropdownComponentProps } from '@/types';

const Dropdown: React.FC<DropdownComponentProps> = ({
  options,
  placeholder = 'Seçiniz',
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [isOptionSelected] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue || option.value === Number(selectedValue)
    );

    if (selectedOption) {
      setSelectedOption(selectedOption.value);
      onChange(selectedOption);
    } else {
      console.error('Geçersiz seçim');
    }
  };

  return (
    <div>
      <div className="relative z-20 bg-white dark:bg-form-input">
        <select
          value={selectedOption ?? ''}
          onChange={handleChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-body dark:text-bodydark"
            >
              {option.label}
            </option>
          ))}
        </select>

        <span className="absolute right-4 top-1/2 z-50 -translate-y-1/2 dark:text-white">
          <ChevronDown />
        </span>
      </div>
    </div>
  );
};

export default Dropdown;
