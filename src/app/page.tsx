import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React from 'react';
import type { Metadata } from 'next';
import Welcome from '@/components/Welcome';

export const metadata: Metadata = {
  title: 'Public Sector',
  description: '',
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
