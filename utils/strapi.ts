import {
  Instead,
  NaverItemsData,
  PeriodtOmtData,
  PeriodtTimelineData,
  YouTubeItemData,
  YouTubePlaylistData,
} from 'types';

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

export async function getYouTubeItemData(start?: number, count?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/youtube-news-productions?sort[0]=id:desc&pagination[page]=${start}&pagination[pageSize]=${count}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  const filesData = data.data;
  const rowsData: YouTubeItemData[] = filesData.map((data: any) => ({
    id: data.id,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    video_id: data.attributes.videoId,
    description: data.attributes.description,
    comment: data.attributes.comment,
    created: data.attributes.created,
    title: data.attributes.title,
  }));

  return rowsData;
}

export async function getYouTubePlaylistData(start?: number, count?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/youtube-playlist-productions?sort[0]=id:desc&pagination[page]=${start}&pagination[pageSize]=${count}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  const filesData = data.data;
  const rowsData: YouTubePlaylistData[] = filesData.map((data: any) => ({
    id: data.id,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    title: data.attributes.subject,
    created: data.attributes.created,
    title1: data.attributes.subject1,
    description1: data.attributes.description1,
    comment1: data.attributes.comment1,
    video_id1: data.attributes.videoId1,
    title2: data.attributes.subject2,
    description2: data.attributes.description2,
    comment2: data.attributes.comment2,
    video_id2: data.attributes.videoId2,
    title3: data.attributes.subject3,
    description3: data.attributes.description3,
    comment3: data.attributes.comment3,
    video_id3: data.attributes.videoId3,
    title4: data.attributes.subject4,
    description4: data.attributes.description4,
    comment4: data.attributes.comment4,
    video_id4: data.attributes.videoId4,
    title5: data.attributes.subject5,
    description5: data.attributes.description5,
    comment5: data.attributes.comment5,
    video_id5: data.attributes.videoId5,
    title6: data.attributes.subject6,
    description6: data.attributes.description6,
    comment6: data.attributes.comment6,
    video_id6: data.attributes.videoId6,
    title7: data.attributes.subject7,
    description7: data.attributes.description7,
    comment7: data.attributes.comment7,
    video_id7: data.attributes.videoId7,
    title8: data.attributes.subject8,
    description8: data.attributes.description8,
    comment8: data.attributes.comment8,
    video_id8: data.attributes.videoId8,
    title9: data.attributes.subject9,
    description9: data.attributes.description9,
    comment9: data.attributes.comment9,
    video_id9: data.attributes.videoId9,
    title10: data.attributes.subject10,
    description10: data.attributes.description10,
    comment10: data.attributes.comment10,
    video_id10: data.attributes.videoId10,
  }));

  return rowsData;
}

export async function getNaverNewsData(start?: number, count?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/naver-news-productions?sort[0]=id:desc&pagination[page]=${start}&pagination[pageSize]=${count}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  const filesData = data.data;
  const rowsData: NaverItemsData[] = filesData.map((data: any) => ({
    ida: `${data.id}`,
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    title: data.attributes.title,
    description: data.attributes.description,
    thumbnail: data.attributes.thumbnail,
    created: data.attributes.created,
    oid: data.attributes.oid,
    aid: data.attributes.aid,
  }));

  const fullData = await Promise.all(
    rowsData.map(async (article) => {
      const url = `https://n.news.naver.com/article/${article.oid}/${article.aid}`;
      const newsMetaData = await fetchArticleMetadata(url);
      return {
        ...article,
        newsMetaData,
      };
    }),
  );

  return fullData;
}

export async function getNaverEntertainmentData(start?: number, count?: number) {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/naver-entertainment-productions?sort[0]=id:desc&pagination[page]=${start}&pagination[pageSize]=${count}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  const filesData = data.data;
  const rowsData: NaverItemsData[] = filesData.map((data: any) => ({
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    title: data.attributes.title,
    description: data.attributes.description,
    thumbnail: data.attributes.thumbnail,
    created: data.attributes.created,
    oid: data.attributes.oid,
    aid: data.attributes.aid,
  }));

  const fullData = await Promise.all(
    rowsData.map(async (article) => {
      const url = `https://n.news.naver.com/entertain/article/${article.oid}/${article.aid}`;
      const entertainmentMetaData = await fetchArticleMetadata(url);
      return {
        ...article,
        entertainmentMetaData,
      };
    }),
  );

  return fullData;
}

export async function getPreviewData(start?: number, count?: number) {
  const url = `${process.env.STRAPI_URL}/api/instead-productions?sort[0]=id:desc&pagination[page]=${start}&pagination[pageSize]=${count}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const data = await response.json();
  const filesData = data.data;
  const rowsData: Instead[] = filesData.map((data: any) => ({
    idx: `${formatDate(data.attributes.createdAt)}${data.id}`,
    title: data.attributes.subject,
    addr: data.attributes.address,
    comment: data.attributes.comment,
  }));

  const fullData = await Promise.all(
    rowsData.map(async (preview) => {
      const insteadMetaData = await fetchPreviewMetadata(preview.addr);
      return {
        ...preview,
        insteadMetaData,
      };
    }),
  );

  return fullData;
}

export async function getPeriodtOmtData(start?: number, count?: number) {
  const url = `${process.env.STRAPI_URL}/api/twitter-omt-prodcutions?sort[0]=id:desc&pagination[page]=${start}&pagination[pageSize]=${count}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const data = await response.json();
  const filesData = data.data;

  const rowsData: PeriodtOmtData[] = filesData.map((data: any) => ({
    idx: `${data.id}`,
    subject: data.attributes.subject,
    quoteUser: data.attributes.quoteUser,
    quoteNumber: data.attributes.quoteNumber,
    quoteTwit: data.attributes.quoteTwit,
    quoteThumbnail1: data.attributes.quoteThumbnail1,
    quoteThumbnail2: data.attributes.quoteThumbnail2,
    quoteThumbnail3: data.attributes.quoteThumbnail3,
    quoteThumbnail4: data.attributes.quoteThumbnail4,
    originUser: data.attributes.originUser,
    originNumber: data.attributes.originNumber,
    originTwit: data.attributes.originTwit,
    originThumbnail1: data.attributes.originThumbnail1,
    originThumbnail2: data.attributes.originThumbnail2,
    originThumbnail3: data.attributes.originThumbnail3,
    originThumbnail4: data.attributes.originThumbnail4,
  }));

  return rowsData;
}

export async function getPeriodtTimelineData(start?: number, count?: number) {
  const url = `${process.env.STRAPI_URL}/api/twitter-timeline-productions?sort[0]=id:desc&pagination[page]=${start}&pagination[pageSize]=${count}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_BEARER_TOKEN}`,
    },
  });
  const data = await response.json();
  const filesData = data.data;

  const rowsData: PeriodtTimelineData[] = filesData.map((data: any) => ({
    idx: `${data.id}`,
    subject: data.attributes.subject,
    originUser: data.attributes.originUser,
    originNumber: data.attributes.originNumber,
    originTwit: data.attributes.originTwit,

    relationUser1: data.attributes.relationUser1,
    relationNumber1: data.attributes.relationNumber1,
    relationTwit1: data.attributes.relationTwit1,
    relationDate1: data.attributes.relationDate1,

    relationUser2: data.attributes.relationUser2,
    relationNumber2: data.attributes.relationNumber2,
    relationTwit2: data.attributes.relationTwit2,
    relationDate2: data.attributes.relationDate2,

    relationUser3: data.attributes.relationUser3,
    relationNumber3: data.attributes.relationNumber3,
    relationTwit3: data.attributes.relationTwit3,
    relationDate3: data.attributes.relationDate3,

    relationUser4: data.attributes.relationUser4,
    relationNumber4: data.attributes.relationNumber4,
    relationTwit4: data.attributes.relationTwit4,
    relationDate4: data.attributes.relationDate4,

    relationUser5: data.attributes.relationUser5,
    relationNumber5: data.attributes.relationNumber5,
    relationTwit5: data.attributes.relationTwit5,
    relationDate5: data.attributes.relationDate5,
  }));

  return rowsData;
}

async function fetchArticleMetadata(url: string) {
  try {
    const response = await fetch(`https://naver-news-opengraph.vercel.app/api/og?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch article metadata', error);
    return {};
  }
}

async function fetchPreviewMetadata(url: string) {
  try {
    const response = await fetch(`${process.env.PREVIEW_API_URL}?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch article metadata', error);
    return {};
  }
}
