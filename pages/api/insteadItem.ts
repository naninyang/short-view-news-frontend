import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).send('Please provide an id.');
  }

  try {
    const response = await fetch(`${process.env.STRAPI_URL}/api/instead-productions/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const insteadData = await response.json();
    const metaResponse = await fetch(
      `https://naver-news-opengraph.vercel.app/api/creator?url=${encodeURIComponent(
        insteadData.data.attributes.address,
      )}`,
    );
    const metaData = await metaResponse.json();
    const mergedData = {
      ...insteadData.data,
      metaData,
    };

    res.status(200).json(mergedData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
