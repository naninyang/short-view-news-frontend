import styled from '@emotion/styled';
import Anchor from './Anchor';
import { hex, rem, mixIn } from '@/styles/designSystem';
import { useRouter } from 'next/router';
import { images } from './images';

const Nav = styled.nav({
  position: 'fixed',
  bottom: 0,
  left: 0,
  display: 'flex',
  zIndex: 1020,
  justifyContent: 'center',
  backdropFilter: `saturate(180%) blur(${rem(20)})`,
  backgroundColor: 'var(--bg-primary-opacity)',
  width: '100%',
  '&::before': {
    content: "''",
    position: 'absolute',
    top: 0,
    display: 'block',
    width: '100%',
    height: '1px',
    backgroundColor: 'var(--border)',
  },
  '& ol': {
    display: 'flex',
    marginBottom: 'env(safe-area-inset-bottom)',
    width: '100%',
  },
  '& li': {
    ...mixIn.col,
  },
  '& a': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: rem(2),
    padding: `${rem(7)} 0`,
    textAlign: 'center',
    '& i': {
      display: 'inline-block',
      width: rem(20),
      height: rem(20),
      '&[data-icon="home"]': {
        'body[data-theme="dark"] &': {
          background: `url(${images.tab.home.light}) no-repeat 50% 50%/contain`,
        },
        'body &, body[data-theme="light"] &': {
          background: `url(${images.tab.home.dark}) no-repeat 50% 50%/contain`,
        },
      },
      '&[data-icon="youtube"]': {
        'body[data-theme="dark"] &': {
          background: `url(${images.tab.youtube.light}) no-repeat 50% 50%/contain`,
        },
        'body &, body[data-theme="light"] &': {
          background: `url(${images.tab.youtube.dark}) no-repeat 50% 50%/contain`,
        },
      },
      '&[data-icon="naver"]': {
        'body[data-theme="dark"] &': {
          background: `url(${images.tab.naver.light}) no-repeat 50% 50%/contain`,
        },
        'body &, body[data-theme="light"] &': {
          background: `url(${images.tab.naver.dark}) no-repeat 50% 50%/contain`,
        },
      },
      '&[data-icon="twitter"]': {
        'body[data-theme="dark"] &': {
          background: `url(${images.tab.twitter.light}) no-repeat 50% 50%/contain`,
        },
        'body &, body[data-theme="light"] &': {
          background: `url(${images.tab.twitter.dark}) no-repeat 50% 50%/contain`,
        },
      },
      '&[data-icon="history"]': {
        'body[data-theme="dark"] &': {
          background: `url(${images.tab.history.light}) no-repeat 50% 50%/contain`,
        },
        'body &, body[data-theme="light"] &': {
          background: `url(${images.tab.history.dark}) no-repeat 50% 50%/contain`,
        },
      },
      '&[data-icon="preview"]': {
        'body[data-theme="dark"] &': {
          background: `url(${images.tab.preview.light}) no-repeat 50% 50%/contain`,
        },
        'body &, body[data-theme="light"] &': {
          background: `url(${images.tab.preview.dark}) no-repeat 50% 50%/contain`,
        },
      },
    },
    '& span': {
      fontSize: rem(12),
      lineHeight: 1,
    },
  },
});

const MenuItem = styled.li<{ currentRouter?: boolean }>(({ currentRouter }) => ({
  '& a': {
    color: currentRouter ? hex.accent : 'var(--txt-subject)',
    fontWeight: currentRouter ? '900' : '400',
    '& i': {
      '&[data-icon="home"]': {
        background: currentRouter ? `url(${images.tab.home.active}) no-repeat 50% 50%/contain !important` : undefined,
      },
      '&[data-icon="youtube"]': {
        background: currentRouter
          ? `url(${images.tab.youtube.active}) no-repeat 50% 50%/contain !important`
          : undefined,
      },
      '&[data-icon="naver"]': {
        background: currentRouter ? `url(${images.tab.naver.active}) no-repeat 50% 50%/contain !important` : undefined,
      },
      '&[data-icon="twitter"]': {
        background: currentRouter
          ? `url(${images.tab.twitter.active}) no-repeat 50% 50%/contain !important`
          : undefined,
      },
      '&[data-icon="history"]': {
        background: currentRouter
          ? `url(${images.tab.history.active}) no-repeat 50% 50%/contain !important`
          : undefined,
      },
      '&[data-icon="preview"]': {
        background: currentRouter
          ? `url(${images.tab.preview.active}) no-repeat 50% 50%/contain !important`
          : undefined,
      },
    },
  },
}));

export default function Services() {
  const router = useRouter();
  return (
    <Nav>
      <ol>
        <MenuItem currentRouter={router.pathname === '/' ? true : false}>
          <Anchor href="/">
            <i data-icon="home" />
            <span>홈</span>
          </Anchor>
        </MenuItem>
        <MenuItem currentRouter={router.pathname === '/watches' || router.pathname.includes('/watch') ? true : false}>
          <Anchor href="/watches">
            <i data-icon="youtube" />
            <span>유튜브</span>
          </Anchor>
        </MenuItem>
        <MenuItem
          currentRouter={router.pathname === '/articles' || router.pathname.includes('/article') ? true : false}
        >
          <Anchor href="/articles">
            <i data-icon="naver" />
            <span>네이버</span>
          </Anchor>
        </MenuItem>
        <MenuItem currentRouter={router.pathname === '/periodt' ? true : false}>
          <Anchor href="/periodt">
            <i data-icon="twitter" />
            <span>트위터</span>
          </Anchor>
        </MenuItem>
        <MenuItem currentRouter={router.pathname === '/history' ? true : false}>
          <Anchor href="/history">
            <i data-icon="history" />
            <span>히스토리</span>
          </Anchor>
        </MenuItem>
        <MenuItem
          currentRouter={router.pathname === '/insteads' || router.pathname.includes('/instead') ? true : false}
        >
          <Anchor href="/insteads">
            <i data-icon="preview" />
            <span>미리보기</span>
          </Anchor>
        </MenuItem>
      </ol>
    </Nav>
  );
}
