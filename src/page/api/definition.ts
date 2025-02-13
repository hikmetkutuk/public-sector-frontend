import { NextApiRequest, NextApiResponse } from 'next';
import { DefinitionProps } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.error('API URL not found');
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL!);
    const data: DefinitionProps[] = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data ' + error });
  }
}
