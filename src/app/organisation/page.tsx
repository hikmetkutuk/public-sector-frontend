import React from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

const Page = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Organizasyon Şeması" />
    </DefaultLayout>
  );
};

export default Page;
