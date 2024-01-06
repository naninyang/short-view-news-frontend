import React, { useEffect, useState } from 'react';
import Seo from '@/components/Seo';
import PageName from '@/components/PageName';
import WatchesNewsItem from './newsItem';
import WatchesPlaylist from './playlist';
import tabs from '@/styles/tabs.module.sass';
import styles from '@/styles/watches.module.sass';

export default function Watches() {
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const timestamp = Date.now();

  useEffect(() => {
    const currentTab = localStorage.getItem('currentWatches');

    if (currentTab === 'news') {
      setActiveArea(1);
    } else if (currentTab === 'playlist') {
      setActiveArea(2);
    }

    localStorage.removeItem('currentPage');
    localStorage.setItem('currentPage', 'watches');
  }, []);

  const handleTabChange = (tabNumber: number) => {
    setActiveArea(tabNumber);

    if (tabNumber === 1) {
      localStorage.setItem('currentWatches', 'news');
    } else if (tabNumber === 2) {
      localStorage.setItem('currentWatches', 'playlist');
    } else {
      localStorage.removeItem('currentWatches');
    }
  };

  return (
    <main className={styles.watches}>
      <Seo
        pageTitle="유튜브 쇼츠 뉴스"
        pageDescription="내가 놓친 뉴스 기사를 보여줘"
        pageImg={`https://shorts.dev1stud.io/og-image.png?ts=${timestamp}`}
      />
      <PageName pageName="유튜브 쇼츠 뉴스" />
      <div className={styles.list}>
        <nav className={tabs.nav}>
          <ul>
            <li>
              <button
                type="button"
                onClick={() => handleTabChange(1)}
                className={`${activeArea === null || activeArea === 1 ? tabs.active : ''}`}
              >
                <span>뉴스 아이템</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleTabChange(2)}
                className={`${activeArea === 2 ? tabs.active : ''}`}
              >
                <span>플레이리스트</span>
              </button>
            </li>
          </ul>
        </nav>
        {(activeArea === null || activeArea === 1) && <WatchesNewsItem />}
        {activeArea === 2 && <WatchesPlaylist />}
      </div>
    </main>
  );
}
