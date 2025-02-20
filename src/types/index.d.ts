import {ReactNode} from 'react';

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
    type: number;
    code?: string;
    parentId?: string;
    parentName?: string;
    typeText: string;
}

declare interface DefinitionPageProps {
    definitions: DefinitionProps[];
}

declare interface DropdownProps {
    value: number | string;
    label: string;
}

declare interface DropdownComponentProps {
    options: { value: string | number; label: string }[];
    placeholder?: string;
    onChange: (selected: DropdownProps) => void;
    value?: DropdownOption;
}

declare interface CreateDefinitionProps {
    name: string;
    code?: string;
    parentName?: string;
    type: number;
}
