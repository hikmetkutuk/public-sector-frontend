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

declare interface DefinitionProps {
  id: string;
  name: string;
  parentName?: string;
  typeText: string;
}

declare interface DefinitionPageProps {
  definitions: DefinitionProps[];
}

declare interface DropdownProps {
  value: number;
  label: string;
}

declare interface DropdownComponentProps {
  options: { value: string | number; label: string }[];
  placeholder?: string;
  onChange: (selected: { value: string | number; label: string }) => void;
}

declare interface CreateDefinitionProps {
  name: string;
  code?: string;
  parentName?: string;
  type: number;
}