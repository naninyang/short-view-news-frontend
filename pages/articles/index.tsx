import React, { useEffect, useState } from 'react';
import Seo from '@/components/Seo';
import PageName from '@/components/PageName';
import ArticlesNews from './news';
import ArticlesEntertainment from './entertainment';
import tabs from '@/styles/tabs.module.sass';
import styles from '@/styles/articles.module.sass';

function Articles() {
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const timestamp = Date.now();

  useEffect(() => {
    const currentTab = localStorage.getItem('currentArticles');

    if (currentTab === 'news') {
      setActiveArea(1);
    } else if (currentTab === 'entertainment') {
      setActiveArea(2);
    }

    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'articles');
  }, []);

  const handleTabChange = (tabNumber: number) => {
    setActiveArea(tabNumber);

    if (tabNumber === 1) {
      localStorage.setItem('currentArticles', 'news');
    } else if (tabNumber === 2) {
      localStorage.setItem('currentArticles', 'entertainment');
    } else {
      localStorage.removeItem('currentArticles');
    }
  };

  return (
    <main className={styles.articles}>
      <Seo
        pageTitle="네이버 뉴스 기사"
        pageDescription="내가 놓친 뉴스 기사를 보여줘"
        pageImg={`https://shorts.dev1stud.io/og-image.png?ts=${timestamp}`}
      />
      <PageName pageName="네이버 뉴스" />
      <div className={styles.list}>
        <nav className={tabs.nav}>
          <ul>
            <li>
              <button
                type="button"
                onClick={() => handleTabChange(1)}
                className={`${activeArea === null || activeArea === 1 ? tabs.active : ''}`}
              >
                <span>일반 뉴스</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleTabChange(2)}
                className={`${activeArea === 2 ? tabs.active : ''}`}
              >
                <span>연예 뉴스</span>
              </button>
            </li>
          </ul>
        </nav>
        {(activeArea === null || activeArea === 1) && <ArticlesNews />}
        {activeArea === 2 && <ArticlesEntertainment />}
      </div>
    </main>
  );
}

export default Articles;
