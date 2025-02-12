import { ReactNode } from 'react';

interface SidebarItemType {
  label: string;
  route: string;
  icon?: ReactNode;
  children?: SidebarItemType[];
}

declare interface SidebarItemProps {
  item: SidebarItemType;
  pageName: string;
  setPageName: (pageName: string) => void;
}

declare interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

declare interface SidebarDropdownProps {
  item: SidebarItemType[];
}
