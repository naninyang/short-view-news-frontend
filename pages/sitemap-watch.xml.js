const WatchAPI = 'https://shorts.dev1stud.io/api/sitemapWatch';
// const WatchAPI = 'http://localhost:3003/api/sitemapWatch';

function generateSiteMap(watchs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${watchs
        .map(({ idx, created }) => {
          return `
            <url>
              <loc>https://shorts.dev1stud.io/${idx}</loc>
              <lastmod>${created}</lastmod>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;
}

function SiteMap() {}

export async function getServerSideProps({ res }) {
  const watchRequest = await fetch(WatchAPI);
  const watchs = await watchRequest.json();

  const sitemap = generateSiteMap(watchs);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
