import { CreateDefinitionProps } from '@/types';

export const createDefinition = async (definitionData: CreateDefinitionProps) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(definitionData),
    });

    return await response.json();
  } catch (error) {
    console.error('Error creating definition', error);
    throw error;
  }
};

export const fetchDefinitions = async (selectedEnum: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition/${selectedEnum}`);
    return await response.json();
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
