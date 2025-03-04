import React from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { RefreshCcw } from 'lucide-react';
import { OrganizationNode } from '@/types';
import { TreeNode } from '@/components/TreeNode';

const organizationData: OrganizationNode[] = [
  {
    id: 1,
    name: 'Merkez Yönetim',
    children: [
      { id: 11, name: 'İnsan Kaynakları' },
      { id: 12, name: 'Finans Departmanı', children: [{ id: 121, name: 'Muhasebe' }] },
    ],
  },
  {
    id: 2,
    name: 'Bölge Müdürlükleri',
    children: [
      { id: 21, name: 'İstanbul Bölge' },
      { id: 22, name: 'Ankara Bölge' },
    ],
  },
];

const Page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Organizasyon Şeması" />
      <div className="flex min-h-screen flex-col gap-10">
        <div className="mb-4 flex justify-end">
          <button className="inline-flex items-center justify-center gap-1.5 bg-primary py-1 text-sm font-medium text-white hover:bg-opacity-90 lg:px-3 xl:px-4">
            <RefreshCcw size={14} /> Güncelle
          </button>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <div>
            {organizationData.map((node) => (
              <TreeNode key={node.id} node={node} />
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Page;
