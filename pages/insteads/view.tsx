import React, { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Modal from 'react-modal';
import axios, { AxiosError } from 'axios';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { ArrayData, Instead } from 'types';
import { modalContainer } from '@/components/ModalStyling';
import { FormatDate } from '@/components/FormatDate';
import InsteadDetail from '@/components/Instead';
import AnchorLink from '@/components/Anchor';
import styles from '@/styles/insteads.module.sass';

Modal.setAppElement('#__next');

export function useDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  const desktop = useMediaQuery({ query: '(min-width: 768px)' });
  useEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);
  return isDesktop;
}

export function useTablet() {
  const [isTablet, setIsTablet] = useState(false);
  const tablet = useMediaQuery({ query: '(min-width: 576px)' });
  useEffect(() => {
    setIsTablet(tablet);
  }, [tablet]);
  return isTablet;
}

function InsteadsView() {
  const router = useRouter();

  const [waitingFor504, setWaitingFor504] = useState(false);

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get(url);
      setWaitingFor504(false);
      return response.data;
    } catch (error) {
      if ((error as AxiosError).response?.status === 504) {
        setWaitingFor504(true);
      }
      throw error;
    }
  };

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/api/previews?start=${pageIndex + 1}&count=20`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 7000,
  });

  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  const insteadId = Array.isArray(router.query.insteadId) ? router.query.insteadId[0] : router.query.insteadId;

  const insteads = data ? [].concat(...data) : [];
  const isLoading = !data && !error;
  const isReachingEnd = data && data[data.length - 1]?.length < 20;

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting && !isReachingEnd && !isLoading && (size === 0 || size === 1)) {
      setSize((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(onIntersect);
    observer.observe(target);
    return () => observer && observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!target || isLoading) return;
  }, [target, isLoading]);

  const selectedInstead = Array.isArray(insteads)
    ? insteads.find((instead: any) => instead.idx === insteadId)
    : undefined;

  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (insteadId !== undefined) {
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
    } else {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    }

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [insteadId]);

  const handleRefresh = async () => {
    window.location.reload();
  };

  const isTablet = useTablet();

  const PreviewComment: React.FC<{ comment: ArrayData[] }> = ({ comment }) => {
    return (
      <>
        {comment.map((cmt, index) => (
          <p className={styles.comment} key={index}>
            {cmt.children[0].text}
          </p>
        ))}
      </>
    );
  };

  return (
    <>
      <Modal
        isOpen={!!insteadId}
        onRequestClose={() => router.push('/insteads', undefined, { scroll: false })}
        contentLabel="Instead Modal"
        style={modalContainer}
      >
        <InsteadDetail insteadItem={selectedInstead} />
      </Modal>
      {isLoading && (
        <div className={styles.loading}>
          <p>뉴스를 가져오는 중입니다. 속도가 다소 느릴 수 있습니다.</p>
        </div>
      )}
      {waitingFor504 && (
        <div className={styles.error}>
          <p>
            임시로 데이터를 불러 올 수 없는 상태입니다.
            <br />
            <button onClick={() => window.location.reload()}>다시 시도</button> 해 주세요 ㅠㅠ
            <br />
            (두어번 누르고 기다리시면 자동으로 불러옵니다.)
          </p>
        </div>
      )}
      {error && (
        <div className={styles.error}>
          <p>데이터를 불러오는데 실패했습니다.</p>
          <button onClick={() => window.location.reload()}>다시 시도</button>
        </div>
      )}
      {!isLoading && !error && (
        <div className={styles['instead-content']}>
          <PullToRefresh onRefresh={handleRefresh}>
            <div className={styles['instead-list']}>
              {insteads.map((instead: Instead) => (
                <article key={instead.idx}>
                  <div className={styles.opengraph}>
                    <div className={styles['og-container']}>
                      <AnchorLink href={instead.addr}>
                        원본:{' '}
                        {instead.insteadMetaData?.ogSiteName
                          ? instead.insteadMetaData?.ogSiteName
                          : instead.insteadMetaData?.twitterSite}
                      </AnchorLink>
                      {instead.insteadMetaData?.ownerAvatar ? (
                        <img src={instead.insteadMetaData?.ogImage} alt="" />
                      ) : (
                        <div className={styles.thumbnails}>
                          <img src={instead.insteadMetaData?.ogImage} alt="" className={styles['thumbnail-origin']} />
                          <img
                            src={instead.insteadMetaData?.ogImage}
                            alt=""
                            className={styles['thumbnail-background']}
                          />
                        </div>
                      )}
                      <div className={styles['og-info']}>
                        {isTablet ? (
                          <>
                            <div className={styles.summary}>
                              <Link
                                key={instead.idx}
                                href={`/insteads?insteadId=${instead.idx}`}
                                as={`/instead/${instead.idx}`}
                                scroll={false}
                                shallow={true}
                              >
                                <strong>{instead.insteadMetaData?.ogTitle}</strong>{' '}
                              </Link>
                              <div className={styles.user}>
                                {instead.insteadMetaData?.ownerAvatar ? (
                                  <img src={instead.insteadMetaData?.ownerAvatar} alt="" />
                                ) : (
                                  <img src={instead.insteadMetaData?.pressAvatar} alt="" />
                                )}
                                <div className={styles['user-info']}>
                                  <cite>
                                    {instead.insteadMetaData?.ownerName
                                      ? instead.insteadMetaData?.ownerName
                                      : instead.insteadMetaData?.twitterCreator}
                                  </cite>
                                  {instead.insteadMetaData?.datePublished ? (
                                    <time dateTime={instead.insteadMetaData?.datePublished}>
                                      {FormatDate(instead.insteadMetaData?.datePublished)}
                                    </time>
                                  ) : (
                                    <time dateTime={instead.insteadMetaData?.pressPublished}>
                                      {FormatDate(`${instead.insteadMetaData?.pressPublished}`)}
                                    </time>
                                  )}
                                </div>
                                `{' '}
                              </div>
                            </div>
                            <div className={styles.description}>
                              {instead.insteadMetaData?.ogDescription}
                              ...
                            </div>
                          </>
                        ) : (
                          <div className={styles.detail}>
                            {instead.insteadMetaData?.ownerAvatar ? (
                              <img src={instead.insteadMetaData?.ownerAvatar} alt="" />
                            ) : (
                              <img src={instead.insteadMetaData?.pressAvatar} alt="" />
                            )}
                            <div className={styles['user-info']}>
                              <Link key={instead.idx} href={`/instead/${instead.idx}`} scroll={false} shallow={true}>
                                <strong>{instead.insteadMetaData?.ogTitle}</strong>{' '}
                              </Link>
                              <div className={styles.user}>
                                <cite>
                                  {instead.insteadMetaData?.ownerName
                                    ? instead.insteadMetaData?.ownerName
                                    : instead.insteadMetaData?.twitterCreator}
                                </cite>
                                {instead.insteadMetaData?.datePublished ? (
                                  <time dateTime={instead.insteadMetaData?.datePublished}>
                                    {FormatDate(instead.insteadMetaData?.datePublished)}
                                  </time>
                                ) : (
                                  <time dateTime={instead.insteadMetaData?.pressPublished}>
                                    {FormatDate(`${instead.insteadMetaData?.pressPublished}`)}
                                  </time>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.description}>
                    <PreviewComment comment={instead.comment} />
                  </div>
                </article>
              ))}
            </div>
          </PullToRefresh>
          {isReachingEnd !== undefined && (
            <div ref={setTarget} className={styles.ref}>
              {isReachingEnd === false && <p>뉴스를 불러오는 중입니다.</p>}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default InsteadsView;
