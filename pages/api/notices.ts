import type { NextApiRequest, NextApiResponse } from 'next';
import { getNoticeData } from '@/utils/strapi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    try {
      const data = await getNoticeData();
      res.status(200).json(data);
    } catch (error) {
      console.log('Unsupported method');
    }
  } else {
    try {
      const response = await fetch(`${process.env.NOTICE_URL}/api/notice-nol2trs/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NOTICE_BEARER_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch article data');
      }
      const articleData = await response.json();
      res.status(200).json(articleData);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}
