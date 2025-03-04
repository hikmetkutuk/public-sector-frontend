import { House, FileSliders, Variable, FolderTree } from 'lucide-react';
import React from 'react';

export const menuGroups = [
  {
    menuItems: [
      {
        icon: React.createElement(House, { className: 'menu-icon' }),
        label: 'Ana Sayfa',
        route: '/',
      },
      {
        icon: React.createElement(FileSliders, { className: 'menu-icon' }),
        label: 'Sistem Parametreleri',
        route: '#',
        children: [
          {
            label: 'Tanımlar',
            route: '/definition',
            icon: React.createElement(Variable, { className: 'menu-icon' }),
          },
          {
            label: 'Organizasyon',
            route: '/organisation',
            icon: React.createElement(FolderTree, { className: 'menu-icon' }),
          },
        ],
      },
    ],
  },
];
