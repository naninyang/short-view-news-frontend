import { NaverAPIResponse, NaverResult, NotionPageResponse, NotionRichText, YouTubeProperties } from 'types';
import { Client } from '@notionhq/client';
export const notion = new Client({ auth: process.env.NOTION_SECRET });

export async function getCommentData() {
  const response = await notion.databases.query({ database_id: process.env.NOTION_DATABASE_ID_COMMENTS! });
  const rowsData = response.results.map((result: any) => {
    return {
      collection: result.properties.collection?.title[0]?.plain_text || '',
      created: result.properties.created?.date?.start || '',
      idx: result.properties.idx?.rich_text[0]?.plain_text || '',
      username: result.properties.username?.rich_text[0]?.plain_text || '',
      comment: result.properties.comment?.rich_text[0]?.plain_text || '',
    };
  });
  const sortedRowsData = rowsData.sort((a, b) => b.created.localeCompare(a.created));
  return sortedRowsData;
}

export interface YouTubeResult {
  properties: YouTubeProperties;
}

export interface YouTubeAPIResponse {
  results: YouTubeResult[];
}

export async function getHistoryNaver(): Promise<NaverAPIResponse> {
  const databaseId = process.env.NOTION_DATABASE_ID_HISTORY_NAVER;

  if (!databaseId) {
    throw new Error('뭐용?');
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    const RowData = response.results
      .map((item: any) => {
        if (item.object !== 'page' || !item.properties) {
          return null;
        }

        const properties = {
          title: item.properties.title.title[0]?.plain_text,
          update: item.properties.update?.date?.start,
          due: item.properties.due?.checkbox,
          article_id1: item.properties.article_id1?.rich_text[0]?.plain_text,
          datetime1: item.properties.datetime1?.date?.start,
          article_id2: item.properties.article_id2?.rich_text[0]?.plain_text,
          datetime2: item.properties.datetime2?.date?.start,
          article_id3: item.properties.article_id3?.rich_text[0]?.plain_text,
          datetime3: item.properties.datetime3?.date?.start,
          article_id4: item.properties.article_id4?.rich_text[0]?.plain_text,
          datetime4: item.properties.datetime4?.date?.start,
          article_id5: item.properties.article_id5?.rich_text[0]?.plain_text,
          datetime5: item.properties.datetime5?.date?.start,
          article_id6: item.properties.article_id6?.rich_text[0]?.plain_text,
          datetime6: item.properties.datetime6?.date?.start,
          article_id7: item.properties.article_id7?.rich_text[0]?.plain_text,
          datetime7: item.properties.datetime7?.date?.start,
          article_id8: item.properties.article_id8?.rich_text[0]?.plain_text,
          datetime8: item.properties.datetime8?.date?.start,
          article_id9: item.properties.article_id9?.rich_text[0]?.plain_text,
          datetime9: item.properties.datetime9?.date?.start,
          article_id10: item.properties.article_id10?.rich_text[0]?.plain_text,
          datetime10: item.properties.datetime10?.date?.start,
          article_id11: item.properties.article_id11?.rich_text[0]?.plain_text,
          datetime11: item.properties.datetime11?.date?.start,
          article_id12: item.properties.article_id12?.rich_text[0]?.plain_text,
          datetime12: item.properties.datetime12?.date?.start,
          article_id13: item.properties.article_id13?.rich_text[0]?.plain_text,
          datetime13: item.properties.datetime13?.date?.start,
          article_id14: item.properties.article_id14?.rich_text[0]?.plain_text,
          datetime14: item.properties.datetime14?.date?.start,
          article_id15: item.properties.article_id15?.rich_text[0]?.plain_text,
          datetime15: item.properties.datetime15?.date?.start,
          article_id16: item.properties.article_id16?.rich_text[0]?.plain_text,
          datetime16: item.properties.datetime16?.date?.start,
          article_id17: item.properties.article_id17?.rich_text[0]?.plain_text,
          datetime17: item.properties.datetime17?.date?.start,
          article_id18: item.properties.article_id18?.rich_text[0]?.plain_text,
          datetime18: item.properties.datetime18?.date?.start,
          article_id19: item.properties.article_id19?.rich_text[0]?.plain_text,
          datetime19: item.properties.datetime19?.date?.start,
          article_id20: item.properties.article_id20?.rich_text[0]?.plain_text,
          datetime20: item.properties.datetime20?.date?.start,
        };

        return {
          properties,
        };
      })
      .filter((item): item is NaverResult => item !== null);
    return {
      results: RowData,
    };
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
}

export async function getPageInfo(titleValue: string): Promise<string | null> {
  const databaseId = process.env.NOTION_DATABASE_ID_PAGE as string;

  try {
    const response = (await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'name',
        rich_text: {
          contains: titleValue,
        },
      },
      page_size: 1,
    })) as any as NotionPageResponse;

    if (response.results.length > 0 && response.results[0].properties.description) {
      const description = response.results[0].properties.description.rich_text[0]?.plain_text || null;
      return description;
    }
  } catch (error) {
    console.error('Error fetching page info:', error);
  }

  return null;
}

export async function getHistoryYouTube(): Promise<YouTubeAPIResponse> {
  const databaseId = process.env.NOTION_DATABASE_ID_HISTORY_YOUTUBE;

  if (!databaseId) {
    throw new Error('뭐용?');
  }

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const RowData = response.results
      .map((item: any) => {
        if (item.object !== 'page' || !item.properties) {
          return null;
        }

        const properties = {
          title: item.properties.title.title[0]?.plain_text,
          update: item.properties.update?.date?.start,
          due: item.properties.due?.checkbox,

          video_id1: item.properties.video_id1?.rich_text[0]?.plain_text,
          datetime1: item.properties.datetime1?.date?.start,
          subject1: item.properties.subject1?.rich_text.map((rt: NotionRichText) => rt.plain_text).join(' '),
          description1: item.properties.description1?.rich_text[0]?.plain_text,

          video_id2: item.properties.video_id2?.rich_text[0]?.plain_text,
          datetime2: item.properties.datetime2?.date?.start,
          subject2: item.properties.subject2?.rich_text.map((rt: NotionRichText) => rt.plain_text).join(' '),
          description2: item.properties.description2?.rich_text[0]?.plain_text,

          video_id3: item.properties.video_id3?.rich_text[0]?.plain_text,
          datetime3: item.properties.datetime3?.date?.start,
          subject3: item.properties.subject3?.rich_text.map((rt: NotionRichText) => rt.plain_text).join(' '),
          description3: item.properties.description3?.rich_text[0]?.plain_text,

          video_id4: item.properties.video_id4?.rich_text[0]?.plain_text,
          datetime4: item.properties.datetime4?.date?.start,
          subject4: item.properties.subject4?.rich_text.map((rt: NotionRichText) => rt.plain_text).join(' '),
          description4: item.properties.description4?.rich_text[0]?.plain_text,

          video_id5: item.properties.video_id5?.rich_text[0]?.plain_text,
          datetime5: item.properties.datetime5?.date?.start,
          subject5: item.properties.subject5?.rich_text.map((rt: NotionRichText) => rt.plain_text).join(' '),
          description5: item.properties.description5?.rich_text[0]?.plain_text,
        };

        return {
          properties,
        };
      })
      .filter((item): item is YouTubeResult => item !== null);
    return {
      results: RowData,
    };
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
}
