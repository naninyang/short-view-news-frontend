import React, { useEffect } from 'react';
import Seo, { originTitle } from '@/components/Seo';
import PageName from '@/components/PageName';
import InsteadsView from './view';
import styles from '@/styles/insteads.module.sass';

function Insteads() {
  const timestamp = Date.now();

  useEffect(() => {
    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'insteads');
  }, []);

  return (
    <main className={styles.insteads}>
      <Seo
        pageTitle={`대리클릭 - ${originTitle}`}
        pageDescription="내용은 궁금하지만 누르기는 귀찮은 뉴스 기사의 결론을 알려드려요"
        pageImg={`https://shorts.dev1stud.io/og-image.webp?ts=${timestamp}`}
      />
      <PageName pageName="대리 클릭" />
      <div className={styles.list}>
        <InsteadsView />
      </div>
    </main>
  );
}

export default Insteads;
