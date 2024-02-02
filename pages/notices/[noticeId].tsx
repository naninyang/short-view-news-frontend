import { GetStaticPaths, GetStaticProps } from 'next';
import styled from '@emotion/styled';
import { NoticeParalinkData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import { images } from '@/components/images';
import content from '@/styles/content.module.sass';
import styles from '@/styles/pages.module.sass';
import notices from '@/styles/notice.module.sass';

const BackButton = styled.i({
  display: 'block',
  'body[data-theme="dark"] &': {
    background: `url(${images.arrow.backLight}) no-repeat 50% 50%/contain`,
  },
  'body &, body[data-theme="light"] &': {
    background: `url(${images.arrow.backDark}) no-repeat 50% 50%/contain`,
  },
});

const Notice = ({ notice }: { notice: NoticeParalinkData | null }) => {
  const timestamp = Date.now();
  return (
    <main className={`${content.content} ${styles.pages} ${styles.notice} ${notices.notice}`}>
      {!notice ? (
        <p className={styles.loading}>
          <span>안내사항 불러오는 중</span>
          <i />
        </p>
      ) : (
        <>
          <Seo
            pageTitles={`${notice.attributes.subject} - ${originTitle}`}
            pageTitle={`${notice.attributes.subject}`}
            pageDescription={`${notice.attributes.description}`}
            pageImg={`https://shorts.dev1stud.io/og-image.webp?ts=${timestamp}`}
          />
          <div className="top-link">
            <Anchor href="/notices">
              <BackButton />
              <span>뒤로가기</span>
            </Anchor>
          </div>
          <article>
            <header>
              <h2>{notice.attributes.subject}</h2>
              <time dateTime={notice.attributes.createdAt}>{notice.attributes.created}</time>
            </header>
            <div className={notices.description}>
              <p dangerouslySetInnerHTML={{ __html: notice.attributes.description.replace(/\n/g, '<br />') }} />
            </div>
          </article>
        </>
      )}
    </main>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const noticeId = context.params?.noticeId;
  let notice = null;

  if (noticeId && typeof noticeId === 'string') {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices/?id=${noticeId.substring(14)}`);
    const data = (await response.json()) as { data: NoticeParalinkData[] };
    notice = data.data;
  }

  if (!notice) {
    return {
      props: {
        notice: null,
      },
    };
  }

  return {
    props: {
      notice,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default Notice;
