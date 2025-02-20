import {CreateDefinitionProps, DefinitionProps} from '@/types';

export const createDefinition = async (definitionData: CreateDefinitionProps) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(definitionData),
    });

    const data = await response.json();
    return { ...data, id: data.id };
  } catch (error) {
    console.error('Error creating definition', error);
    throw error;
  }
};

export const fetchDefinitions = async (selectedEnum: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition/${selectedEnum}`);
    const data = await response.json();
    return data.map((item: DefinitionProps) => ({
      ...item,
      id: item.id // Should always exist and be unique
    }));
  } catch (error) {
    console.error('Error retrieving definitions', error);
    return [];
  }
};

export const fetchEnumDefinitions = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition/enum`);
    const data = await response.json();

    return Object.keys(data).map((key) => ({
      value: data[key].value,
      label: data[key].description,
    }));
  } catch (error) {
    console.error('An error occurred while retrieving data: ', error);
    throw error;
  }
};

export const fetchParentDefinitions = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition/1`);
    const data = await response.json();

    return Array.isArray(data)
      ? data.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      : [];
  } catch (error) {
    console.error('Error retrieving parent definitions:', error);
    return [];
  }
};

export const updateDefinition = async (id: string, definitionData: CreateDefinitionProps) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(definitionData),
    });

    if (!response.ok) {
      throw new Error('Failed to update definition');
    }

    const data = await response.json();
    return { ...data, id: data.id || id };
  } catch (error) {
    console.error('Error updating definition', error);
    throw error;
  }
};

export const deleteDefinition = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete definition');
  return response.json();
};