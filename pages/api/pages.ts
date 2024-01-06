import type { NextApiRequest, NextApiResponse } from 'next';
import { getPageInfo } from '@/utils/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const title = String(req.query.title);

    const description = await getPageInfo(title);

    if (description) {
      res.status(200).json({ description });
    } else {
      res.status(404).json({ error: 'Description not found for the given title' });
    }
  } else {
    res.status(405).end();
  }
}
