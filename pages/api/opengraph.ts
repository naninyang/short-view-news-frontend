import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (typeof url !== 'string') {
    res.status(400).json({ error: 'Invalid URL parameter.' });
    return;
  }

  try {
    const response = await fetch(`https://naver-news-opengraph.vercel.app/api/og?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    res.json(data);
  } catch (error: any) {
    res.status(error.data?.status || 500).json(error.data?.data || {});
  }
}
