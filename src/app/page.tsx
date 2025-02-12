import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React from 'react';
import type { Metadata } from 'next';
import Welcome from '@/components/Welcome';

export const metadata: Metadata = {
  title: 'Public Sector',
  description: '',
  icons: {
    icon: '/images/logo.svg',
  },
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Welcome />
      </DefaultLayout>
    </>
  );
}
