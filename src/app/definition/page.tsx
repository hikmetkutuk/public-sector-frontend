'use client';

import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { DefinitionPageProps } from '@/types';
import { FilePenLine, Trash2 } from 'lucide-react';
import Dropdown from '@/components/Dropdown';

const Definition = () => {
  const [definitions, setDefinitions] = useState<DefinitionPageProps['definitions']>([]);
  const [definitionEnum, setDefinitionEnum] = useState<{ value: number; label: string }[]>([]);
  const [selectedEnum, setSelectedEnum] = useState<number | null>(null);

  const handleDropdownChange = (selected: { value: string | number; label: string }) => {
    setSelectedEnum(selected.value as number);
  };

  useEffect(() => {
    if (selectedEnum !== null) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/definition/${selectedEnum}`
          );
          const data = await response.json();
          setDefinitions(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error('Error data retrieving', error);
          setDefinitions([]);
        }
      };

      fetchData().then((r) => r);
    }
  }, [selectedEnum]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition/enum`);
        const data = await response.json();

        const formattedData = Object.keys(data).map((key) => ({
          value: data[key].value,
          label: data[key].description,
        }));

        setDefinitionEnum(formattedData);
      } catch (error) {
        console.error('An error occurred while retrieving data: ', error);
      }
    };

    fetchData().then((r) => r);
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tanım Listesi" />

      <div className="flex min-h-screen flex-grow flex-col gap-10">
        <Dropdown
          options={definitionEnum}
          placeholder="Bir Tanım Seçin"
          onChange={handleDropdownChange}
        />
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-bold text-black dark:text-white xl:pl-11">
                    Üst Eleman
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-bold text-black dark:text-white">
                    Adı
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-bold text-black dark:text-white">
                    Tanım Tipi
                  </th>
                  <th className="px-4 py-4 font-bold text-black dark:text-white"></th>
                </tr>
              </thead>
              <tbody>
                {definitions.map((definition, key) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {definition.parentName}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">{definition.name}</h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {definition.typeText}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-amber-500">
                          <FilePenLine />
                        </button>
                        <button className="hover:text-red-500">
                          <Trash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Definition;
