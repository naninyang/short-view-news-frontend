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

export type NotionPageResponse = {
  object: string;
  results: {
    object: string;
    id: string;
    properties: {
      description: {
        id: string;
        type: string;
        rich_text: Array<{
          type: string;
          text: {
            content: string;
            link: null | string;
          };
          annotations: {
            bold: boolean;
            italic: boolean;
            strikethrough: boolean;
            underline: boolean;
            code: boolean;
            color: string;
          };
          plain_text: string;
          href: null | string;
        }>;
      };
      [key: string]: any;
    }[];
    [key: string]: any;
  };
};

export type NotionRawResponse = {
  results: NotionRawPage[];
  next_cursor: string | null;
};

export interface NotionRichText {
  plain_text: string;
  href?: string | null;
}

export interface NotionDate {
  start: string;
}

export interface NaverCommentResult {
  properties: NaverProperties;
}

export interface NaverCommentResponse {
  results: NaverCommentResult[];
}

export interface YouTubeProperties {
  title: {
    title: NotionRichText[];
  };
  update: {
    date: NotionDate;
  };
  due: {
    checkbox: boolean;
  };
  video_id1: {
    rich_text: NotionRichText[];
  };
  datetime1: {
    date: NotionDate;
  };
  subject1: {
    rich_text: NotionRichText[];
  };
  description1: {
    rich_text: NotionRichText[];
  };
  video_id2: {
    rich_text: NotionRichText[];
  };
  datetime2: {
    date: NotionDate;
  };
  subject2: {
    rich_text: NotionRichText[];
  };
  description2: {
    rich_text: NotionRichText[];
  };
  video_id3: {
    rich_text: NotionRichText[];
  };
  datetime3: {
    date: NotionDate;
  };
  subject3: {
    rich_text: NotionRichText[];
  };
  description3: {
    rich_text: NotionRichText[];
  };
  video_id4: {
    rich_text: NotionRichText[];
  };
  datetime4: {
    date: NotionDate;
  };
  subject4: {
    rich_text: NotionRichText[];
  };
  description4: {
    rich_text: NotionRichText[];
  };
  video_id5: {
    rich_text: NotionRichText[];
  };
  datetime5: {
    date: NotionDate | null;
  };
  subject5: {
    rich_text: NotionRichText[];
  };
  description5: {
    rich_text: NotionRichText[];
  };
}

export interface NaverProperties {
  title: {
    title: NotionRichText[];
  };
  update: {
    date: NotionDate;
  };
  due: {
    checkbox: boolean;
  };
  article_id1: {
    rich_text: NotionRichText[];
  };
  datetime1: {
    date: NotionDate;
  };
  article_id2: {
    rich_text: NotionRichText[];
  };
  datetime2: {
    date: NotionDate;
  };
  article_id3: {
    rich_text: NotionRichText[];
  };
  datetime3: {
    date: NotionDate;
  };
  article_id4: {
    rich_text: NotionRichText[];
  };
  datetime4: {
    date: NotionDate;
  };
  article_id5: {
    rich_text: NotionRichText[];
  };
  datetime5: {
    date: NotionDate | null;
  };
  article_id6: {
    rich_text: NotionRichText[];
  };
  datetime6: {
    date: NotionDate | null;
  };
  article_id7: {
    rich_text: NotionRichText[];
  };
  datetime7: {
    date: NotionDate | null;
  };
  article_id8: {
    rich_text: NotionRichText[];
  };
  datetime8: {
    date: NotionDate | null;
  };
  article_id9: {
    rich_text: NotionRichText[];
  };
  datetime9: {
    date: NotionDate | null;
  };
  article_id10: {
    rich_text: NotionRichText[];
  };
  datetime10: {
    date: NotionDate | null;
  };
  article_id11: {
    rich_text: NotionRichText[];
  };
  datetime11: {
    date: NotionDate | null;
  };
  article_id12: {
    rich_text: NotionRichText[];
  };
  datetime12: {
    date: NotionDate | null;
  };
  article_id13: {
    rich_text: NotionRichText[];
  };
  datetime13: {
    date: NotionDate | null;
  };
  article_id14: {
    rich_text: NotionRichText[];
  };
  datetime14: {
    date: NotionDate | null;
  };
  article_id15: {
    rich_text: NotionRichText[];
  };
  datetime15: {
    date: NotionDate | null;
  };
  article_id16: {
    rich_text: NotionRichText[];
  };
  datetime16: {
    date: NotionDate | null;
  };
  article_id17: {
    rich_text: NotionRichText[];
  };
  datetime17: {
    date: NotionDate | null;
  };
  article_id18: {
    rich_text: NotionRichText[];
  };
  datetime18: {
    date: NotionDate | null;
  };
  article_id19: {
    rich_text: NotionRichText[];
  };
  datetime19: {
    date: NotionDate | null;
  };
  article_id20: {
    rich_text: NotionRichText[];
  };
  datetime20: {
    date: NotionDate | null;
  };
}

export interface YouTubeCommentResult {
  properties: YouTubeProperties;
}

export interface YouTubeCommentResponse {
  results: YouTubeCommentResult[];
}

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
  comment: any;
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
    subject2: string;
    description2: string;
    comment2: string;
    videoId2: string;
    subject3: string;
    description3: string;
    comment3: string;
    videoId3: string;
    subject4: string;
    description4: string;
    comment4: string;
    videoId4: string;
    subject5: string;
    description5: string;
    comment5: string;
    videoId5: string;
    subject6: string;
    description6: string;
    comment6: string;
    videoId6: string;
    subject7: string;
    description7: string;
    comment7: string;
    videoId7: string;
    subject8: string;
    description8: string;
    comment8: string;
    videoId8: string;
    subject9: string;
    description9: string;
    comment9: string;
    videoId9: string;
    subject10: string;
    description10: string;
    comment10: string;
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

interface ArrayDataChild {
  text: string;
}

export interface ArrayData {
  children: ArrayDataChild[];
}

export interface OgData {
  ogImage?: string;
  ogCreator?: string;
  ogSiteName?: string;
  ogTitle?: string;
  ogDescription?: string;
  error?: string;
}

export type PreviewRowData = {
  attributes: {
    idx: string;
    title: string;
    description: string;
    address: string;
    comment: any;
  };
  metaData?: {
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

export interface PeriodtOmtData {
  idx: string;
  subject: string;
  quoteUser: string;
  quoteNumber: string;
  quoteTwit: ArrayData[];
  quoteThumbnail1?: string;
  quoteThumbnail2?: string;
  quoteThumbnail3?: string;
  quoteThumbnail4?: string;
  originUser: string;
  originNumber: string;
  originTwit: ArrayData[];
  originThumbnail1?: string;
  originThumbnail2?: string;
  originThumbnail3?: string;
  originThumbnail4?: string;
}

export interface PeriodtTimelineData {
  idx: string;
  subject: string;
  originUser: string;
  originNumber: boolean;
  originTwit: ArrayData[];
  originDate: string;
  relationUser1: string;
  relationNumber1: string;
  relationTwit1: ArrayData[];
  relationDate1: string;
  relationUser2: string;
  relationNumber2: string;
  relationTwit2: ArrayData[];
  relationDate2: string;
  relationUser3: string;
  relationNumber3: string;
  relationTwit3: ArrayData[];
  relationDate3: string;
  relationUser4: string;
  relationNumber4: string;
  relationTwit4: ArrayData[];
  relationDate4: string;
  relationUser5: string;
  relationNumber5: string;
  relationTwit5: ArrayData[];
  relationDate5: string;
}

export interface NoticeData {
  id: string;
  idx: string;
  platform: string;
  subject: string;
  description: string;
  created: string;
}

export interface NoticeParalinkData {
  attributes: {
    idx: string;
    platform: string;
    subject: string;
    description: string;
    created: string;
    createdAt: string;
  };
}
