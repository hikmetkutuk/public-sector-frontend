import { OrganisationNode } from '@/types';

export const fetchOrganisations = async (parentId?: string): Promise<OrganisationNode[]> => {
  try {
    const endpoint = parentId ? `/organisation/${parentId}` : '/organisation';
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`);

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      console.warn('Expected an array but got:', data);
      return [];
    }

    return data as OrganisationNode[];
  } catch (error) {
    console.error('Error retrieving organisations:', error);
    return [];
  }
};