import React from 'react';
import BasicTable from '@/components/Tables/BasicTable';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const Definition = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tanım Listesi" />

      <div className="flex min-h-screen flex-grow flex-col gap-10">
        <BasicTable />
      </div>
    </DefaultLayout>
  );
};

export default Definition;
