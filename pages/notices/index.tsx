import { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import styled from '@emotion/styled';
import { NoticeData } from 'types';
import Seo, { originTitle } from '@/components/Seo';
import Anchor from '@/components/Anchor';
import { images } from '@/components/images';
import content from '@/styles/content.module.sass';
import styles from '@/styles/pages.module.sass';
import notice from '@/styles/notice.module.sass';

type DataResponse = {
  description: string;
};

interface NoticeProps {
  notices: NoticeData[];
}

const BackButton = styled.i({
  display: 'block',
  'body[data-theme="dark"] &': {
    background: `url(${images.arrow.backLight}) no-repeat 50% 50%/contain`,
  },
  'body &, body[data-theme="light"] &': {
    background: `url(${images.arrow.backDark}) no-repeat 50% 50%/contain`,
  },
});

const Notices: NextPage<NoticeProps> = ({ notices }) => {
  const [data, setData] = useState<DataResponse | null>(null);
  const title = 'Notice';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/pages?title=${title}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching page info:', error);
      }
    }
    fetchData();
  }, [title]);

  const [currentPage, setCurrentPage] = useState<string | null>(null);

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    setCurrentPage(storedPage);
  }, []);

  const [noticesData, setNoticesData] = useState<NoticeData[]>([]);
  useEffect(() => {
    setNoticesData(notices);
  }, [notices]);

  const timestamp = Date.now();

  return (
    <main className={`${content.content} ${styles.pages} ${styles.notice}`}>
      <Seo
        pageTitles={`안내사항 - ${originTitle}`}
        pageTitle="안내사항"
        pageDescription="내가 놓친 뉴스를 보여줘"
        pageImg={`https://shorts.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <div className="top-link">
        {currentPage ? (
          <Anchor href={`/${currentPage}`}>
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        ) : (
          <Anchor href="/">
            <BackButton />
            <span>뒤로가기</span>
          </Anchor>
        )}
      </div>
      {data && (
        <div className={styles['pages-content']}>
          <h1>
            <span>안내사항 Notice.</span>
          </h1>
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </div>
      )}
      <div className={notice.notices}>
        <hr />
        <ul>
          {noticesData
            .filter((notice) => notice.platform === 'shorts')
            .map((notice) => (
              <li key={notice.idx}>
                <Anchor key={notice.idx} href={`/notices/${notice.idx}`} scroll={false} shallow={true}>
                  <strong>
                    <span>{notice.subject}</span>
                  </strong>
                  <time>{notice.created}</time>
                </Anchor>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notices`);
  const data = await response.json();

  return {
    props: { notices: data },
  };
};

export default Notices;
