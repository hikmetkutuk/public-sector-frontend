'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`relative flex-1 flex-col lg:ml-72.5 ${sidebarOpen ? 'lg:ml-0' : ''}`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default React.memo(DefaultLayout, (prevProps, nextProps) => {
  if (React.isValidElement(prevProps.children) && React.isValidElement(nextProps.children)) {
    return prevProps.children.type === nextProps.children.type;
  }
  return prevProps.children === nextProps.children;
});
