import { NextApiRequest, NextApiResponse } from 'next';
import { getHistoryYouTube } from '@/utils/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getHistoryYouTube();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Notion' });
  }
}
