type NotionRichTextProperty = {
  rich_text: {
    type: 'text';
    text: {
      content: string;
    };
  }[];
};

type NotionTitleProperty = {
  title: {
    type: 'text';
    text: {
      content: string;
    };
  }[];
};

export type NotionRawPage = {
  id: string;
  properties: {
    Description?: NotionTitleProperty;
    OID?: NotionRichTextProperty;
    Thumbnail?: NotionRichTextProperty;
    Subject?: NotionRichTextProperty;
    [key: string]: any;
  };
};

export type NotionRawResponse = {
  results: NotionRawPage[];
  next_cursor: string | null;
};

export type Article = {
  idx: string;
  description: string;
  thumbnail: string;
  title: string;
  oid: string;
  aid: string;
  type?: string;
  newsMetaData?: {
    ogTitle: string;
    ogUrl: string;
    ogImage: string;
    ogDescription: string;
    ogCreator: string;
    datestampTimeContent: any;
    datestampTimeAttribute: any;
  };
  entertainmentMetaData?: {
    ogTitle: string;
    ogUrl: string;
    ogImage: string;
    ogDescription: string;
    ogCreator: string;
    datestampTimeContent: any;
    datestampTimeAttribute: any;
  };
};

export type Instead = {
  idx: string;
  title: string;
  description: string;
  addr: string;
  comment: string;
  insteadMetaData?: {
    ogTitle: string;
    ogUrl: string;
    ogImage: string;
    ogDescription: string;
    ogSiteName?: string;
    twitterSite?: string;
    twitterCreator?: string;
    datePublished?: string;
    ownerAvatar?: string;
    ownerName?: string;
    pressPublished?: string;
    pressAvatar?: string;
  };
};

export interface PeriodtOmt {
  idx: string;
  user: string;
  twit: string;
  title: string;
  thumbnail1?: string;
  thumbnail2?: string;
  thumbnail3?: string;
  thumbnail4?: string;
  userOrigin: string;
  twitOrigin: string;
  description: string;
  thumbnailOrigin1?: string;
  thumbnailOrigin2?: string;
  thumbnailOrigin3?: string;
  thumbnailOrigin4?: string;
  [key: string]: any;
}

export interface PeriodtTimeline {
  idx: string;
  title: string;
  description: string;
  quote: boolean;
  user: string;
  tweet: string;
  content: string;
  created: string;
  thumbnail1?: string;
  thumbnail2?: string;
  thumbnail3?: string;
  thumbnail4?: string;
  user1: string;
  tweet1: string;
  content1: string;
  tweetCreated1: string;
  thumbnail11?: string;
  thumbnail21?: string;
  thumbnail31?: string;
  thumbnail41?: string;
  user2: string;
  tweet2: string;
  content2: string;
  tweetCreated2: string;
  thumbnail12?: string;
  thumbnail22?: string;
  thumbnail32?: string;
  thumbnail42?: string;
  user3: string;
  tweet3: string;
  content3: string;
  tweetCreated3: string;
  thumbnail13?: string;
  thumbnail23?: string;
  thumbnail33?: string;
  thumbnail43?: string;
  user4: string;
  tweet4: string;
  content4: string;
  tweetCreated4: string;
  thumbnail14?: string;
  thumbnail24?: string;
  thumbnail34?: string;
  thumbnail44?: string;
  user5: string;
  tweet5: string;
  content5: string;
  tweetCreated5: string;
  thumbnail15?: string;
  thumbnail25?: string;
  thumbnail35?: string;
  thumbnail45?: string;
  [key: string]: any;
}

export interface NotionRichText {
  plain_text: string;
  href?: string | null;
}

export interface NotionDate {
  start: string;
}

export type CommentResponse = {
  collection: string;
  created: string;
  idx: string;
  username: string;
  comment: string;
};

export interface YouTubeItemData {
  idx: string;
  video_id: string;
  description: string;
  comment: string;
  created: string;
  title: string;
}

export interface YouTubePlaylistData {
  idx: string;
  subject: string;
  created: string;
  type?: string;
  title: string;
  description: string;
  video_id: string;
  comment: string;
  title1: string;
  description1: string;
  comment1: string;
  video_id1: string;
  title2?: string;
  description2?: string;
  comment2?: string;
  video_id2: string;
  title3?: string;
  description3?: string;
  comment3?: string;
  video_id3: string;
  title4?: string;
  description4?: string;
  comment4?: string;
  video_id4: string;
  title5?: string;
  description5?: string;
  comment5?: string;
  video_id5: string;
  title6?: string;
  description6?: string;
  comment6?: string;
  video_id6: string;
  title7?: string;
  description7?: string;
  comment7?: string;
  video_id7: string;
  title8?: string;
  description8?: string;
  comment8?: string;
  video_id8: string;
  title9?: string;
  description9?: string;
  comment9?: string;
  video_id9: string;
  title10?: string;
  description10?: string;
  comment10?: string;
  video_id10: string;
}

export interface NewsRowData {
  attributes: {
    idx: string;
    type: string;
    video_id: string;
    description: string;
    comment: string;
    created: string;
    title: string;
  };
}

export interface PlaylistRowData {
  attributes: {
    idx: string;
    type: string;
    subject: string;
    title: string;
    description: string;
    comment: string;
    videoId: string;
    created: string;
    subject1: string;
    description1: string;
    comment1: string;
    videoId1: string;
    subject2?: string;
    description2?: string;
    comment2?: string;
    videoId2: string;
    subject3?: string;
    description3?: string;
    comment3?: string;
    videoId3: string;
    subject4?: string;
    description4?: string;
    comment4?: string;
    videoId4: string;
    subject5?: string;
    description5?: string;
    comment5?: string;
    videoId5: string;
    subject6?: string;
    description6?: string;
    comment6?: string;
    videoId6: string;
    subject7?: string;
    description7?: string;
    comment7?: string;
    videoId7: string;
    subject8?: string;
    description8?: string;
    comment8?: string;
    videoId8: string;
    subject9?: string;
    description9?: string;
    comment9?: string;
    videoId9: string;
    subject10?: string;
    description10?: string;
    comment10?: string;
    videoId10: string;
  };
}

export interface NaverItemsData {
  idx: string;
  title: string;
  description: string;
  oid: string;
  aid: string;
  thumbnail: string;
  created: string;
  newsMetaData: any;
  entertainmentMetaData: any;
}

export interface NaverItemData {
  attributes: {
    type: string;
    idx: string;
    created: string;
    title: string;
    description: string;
    oid: string;
    aid: string;
    thumbnail: string;
  };
  metaData: any;
}
