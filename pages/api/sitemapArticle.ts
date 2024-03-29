import type { NextApiRequest, NextApiResponse } from 'next';

const formatDate = (datetime: string) => {
  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

async function fetchNaverNewsData() {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/naver-news-productions?pagination[page]=1&pagination[pageSize]=10000`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  return data.data;
}

async function fetchNaverEntertainmentData() {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/naver-entertainment-productions?pagination[page]=1&pagination[pageSize]=10000`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  return data.data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newsData = await fetchNaverNewsData();
    const entertainmentData = await fetchNaverEntertainmentData();

    const newsDataProcessed = newsData.map((newsItem: any) => ({
      idx: `article-news/${formatDate(newsItem.attributes.createdAt)}${newsItem.id}`,
      created: newsItem.attributes.createdAt,
    }));

    const entertainmentDataProcessed = entertainmentData.map((entertainmentData: any) => ({
      idx: `article-entertainment/${formatDate(entertainmentData.attributes.createdAt)}${entertainmentData.id}`,
      created: entertainmentData.attributes.createdAt,
    }));

    const combinedData = [...newsDataProcessed, ...entertainmentDataProcessed];

    res.status(200).send(combinedData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
