import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).send('Please provide an id.');
  }

  try {
    const response = await fetch(`${process.env.STRAPI_URL}youtube-playlist-productions/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
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
