import React from 'react';
import { DefinitionProps } from '@/types';
import { FilePenLine, Trash2 } from 'lucide-react';

const definitions: DefinitionProps[] = [
  {
    name: 'İnceleme',
  },
  {
    name: 'Eğitim',
  },
  {
    name: 'Toplantı',
  },
  {
    name: 'Diğer',
  },
];

const BasicTable: React.FC = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-bold text-black dark:text-white xl:pl-11">
                Üst Eleman
              </th>
              <th className="min-w-[150px] px-4 py-4 font-bold text-black dark:text-white">Adı</th>
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
                  <h5 className="font-medium text-black dark:text-white"></h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">{definition.name}</h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white"></h5>
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
  );
};

export default BasicTable;
