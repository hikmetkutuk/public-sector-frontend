import { CreateDefinitionProps, DefinitionProps } from '@/types';

/**
 * Creates a new definition.
 * @param {CreateDefinitionProps} definitionData - The data for the new definition.
 * @returns {Promise<DefinitionProps>} The created definition.
 */
export const createDefinition = async (
  definitionData: CreateDefinitionProps
): Promise<DefinitionProps> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(definitionData),
    });
    const data = await response.json();
    return { ...data, id: data.id };
  } catch (error) {
    console.error('Error creating definition:', error);
    throw error;
  }
};

/**
 * Fetches definitions based on the selected enum.
 * @param {number} selectedEnum - The selected enum value.
 * @returns {Promise<DefinitionProps[]>} The fetched definitions.
 */
export const fetchDefinitions = async (selectedEnum: number): Promise<DefinitionProps[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition/${selectedEnum}`);
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      console.warn('Expected an array but got:', data);
      return [];
    }
    return data.map((item: DefinitionProps) => ({
      ...item,
      id: item.id,
    }));
  } catch (error) {
    console.error('Error retrieving definitions:', error);
    return [];
  }
};

/**
 * Fetches enum definitions.
 * @returns {Promise<Array<{value: number, label: string}>>} The fetched enum definitions.
 */
export const fetchEnumDefinitions = async (): Promise<Array<{ value: number; label: string }>> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition/enum`);
    const data = await response.json();
    return Object.keys(data).map((key) => ({
      value: data[key].value,
      label: data[key].description,
    }));
  } catch (error) {
    console.error('Error fetching enum definitions:', error);
    throw error;
  }
};

/**
 * Fetches parent definitions.
 * @returns {Promise<Array<{value: number, label: string}>>} The fetched parent definitions.
 */
export const fetchParentDefinitions = async (): Promise<
  Array<{ value: string; label: string }>
> => {
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

/**
 * Updates an existing definition.
 * @param {string} id - The ID of the definition to update.
 * @param {CreateDefinitionProps} definitionData - The updated data for the definition.
 * @returns {Promise<DefinitionProps>} The updated definition.
 */
export const updateDefinition = async (
  id: string,
  definitionData: CreateDefinitionProps
): Promise<DefinitionProps> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(definitionData),
    });
    const data = await response.json();
    return { ...data, id: data.id || id };
  } catch (error) {
    console.error('Error updating definition:', error);
    throw error;
  }
};

/**
 * Deletes a definition.
 * @param {string} id - The ID of the definition to delete.
 * @returns {Promise<Object>} The response from the delete operation.
 */
export const deleteDefinition = async (id: string): Promise<object> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/definition/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  } catch (error) {
    console.error('Error deleting definition:', error);
    throw error;
  }
};
