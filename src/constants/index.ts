import { House, FileSliders, Variable } from 'lucide-react';
import React from 'react';

export const menuGroups = [
  {
    menuItems: [
      {
        icon: React.createElement(House),
        label: 'Ana Sayfa',
        route: '/',
      },
      {
        icon: React.createElement(FileSliders),
        label: 'Sistem Parametreleri',
        route: '#',
        children: [
          { label: 'Tanımlar', route: '/definition', icon: React.createElement(Variable) },
        ],
      },
    ],
  },
];
