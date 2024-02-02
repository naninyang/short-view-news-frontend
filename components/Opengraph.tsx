import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Anchor from './Anchor';

interface Props {
  article_id: string;
  datetime: string;
}

interface OpenGraphData {
  ogImage: string;
  ogCreator: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
}

const Container = styled.figure({
  display: 'flex',
  flexDirection: 'column-reverse',
  '& img': {
    display: 'block',
    width: '100%',
  },
});

const Opengraph = ({ article_id, datetime }: Props) => {
  const [openGraph, setOpenGraph] = useState<OpenGraphData | null>(null);

  useEffect(() => {
    async function fetchOpengraph() {
      try {
        const response = await fetch(
          `/api/opengraph?url=${encodeURIComponent(`https://n.news.naver.com/article/${article_id}`)}`,
        );
        const historyResponse = await response.json();
        setOpenGraph(historyResponse);
      } catch (error) {
        console.error('Failed to fetch opengraph', error);
      }
    }
    fetchOpengraph();
  }, []);

  return (
    <Container>
      {openGraph && (
        <>
          <img src={openGraph.ogImage} alt="" />
          <figcaption>
            <time>{datetime}</time>
            <strong>
              {openGraph.ogCreator} / {openGraph.ogTitle}
            </strong>
            <p>
              {openGraph.ogDescription}... <Anchor href={openGraph.ogUrl}>새창에서 마저 읽기</Anchor>
            </p>
          </figcaption>
        </>
      )}
    </Container>
  );
};

export default Opengraph;
