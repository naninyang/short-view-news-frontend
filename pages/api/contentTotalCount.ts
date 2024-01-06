import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const youtubeNewsUrl = `${process.env.STRAPI_URL}/api/youtube-news-productions`;
    const youtubeNewsResponse = await fetch(youtubeNewsUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const youtubeNewsData = await youtubeNewsResponse.json();

    const youtubePlaylistUrl = `${process.env.STRAPI_URL}/api/youtube-playlist-productions`;
    const youtubePlaylistResponse = await fetch(youtubePlaylistUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const youtubePlaylistData = await youtubePlaylistResponse.json();

    const youtubeCount = youtubeNewsData.meta.pagination.total + youtubePlaylistData.meta.pagination.total;

    const naverNewsUrl = `${process.env.STRAPI_URL}/api/naver-news-productions`;
    const naverNewsResponse = await fetch(naverNewsUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const naverNewsData = await naverNewsResponse.json();

    const naverEntertainmentUrl = `${process.env.STRAPI_URL}/api/naver-entertainment-productions`;
    const naverEntertainmentResponse = await fetch(naverEntertainmentUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const naverEntertainmentData = await naverEntertainmentResponse.json();

    const naverCount = naverNewsData.meta.pagination.total + naverEntertainmentData.meta.pagination.total;

    const twitterOmtUrl = `${process.env.STRAPI_URL}/api/twitter-omt-prodcutions`;
    const twitterOmtResponse = await fetch(twitterOmtUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const twitterOmtData = await twitterOmtResponse.json();

    const twitterTimelineUrl = `${process.env.STRAPI_URL}/api/twitter-timeline-productions`;
    const twitterTimelineResponse = await fetch(twitterTimelineUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    });
    const twitterTimelineData = await twitterTimelineResponse.json();

    const twitterCount = twitterOmtData.meta.pagination.total + twitterTimelineData.meta.pagination.total;

    res.status(200).send({ youtube: youtubeCount, naver: naverCount, twitter: twitterCount });
  } else {
    console.log('Unsupported method');
  }
}
