import type { NextApiRequest, NextApiResponse } from 'next';
import { getCommentData, notion } from '@/utils/notion';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { collection, idx } = req.query;
    let data = await getCommentData();

    if (collection || idx) {
      data = data.filter((comment) => {
        const matchesCollection = collection ? comment.collection === collection : true;
        const matchesIdx = idx ? comment.idx === idx : true;
        return matchesCollection && matchesIdx;
      });
    }
    res.status(200).json(data);
  }
  if (req.method === 'POST') {
    const databaseId = process.env.NOTION_DATABASE_ID_COMMENTS as any;
    const { collection, permalink, created, idx, username, comment } = req.body;

    try {
      const pageData = {
        parent: { database_id: databaseId },
        properties: {
          collection: {
            title: [{ text: { content: collection } }],
          },
          permalink: {
            url: permalink,
          },
          created: {
            date: { start: created },
          },
          idx: {
            rich_text: [{ text: { content: idx } }],
          },
          username: {
            rich_text: [{ text: { content: username } }],
          },
          comment: {
            rich_text: [{ text: { content: comment } }],
          },
        },
      };
      await notion.pages.create(pageData);
      res.status(200).json({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
