const SheetAPI = 'https://shorts.dev1stud.io/api/sitemapInstead';
// const InsteadAPI = 'http://localhost:3003/api/sitemapInstead';

function generateSiteMap(sheets) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sheets
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
  const insteadRequest = await fetch(InsteadAPI);
  const insteads = await insteadRequest.json();

  const sitemap = generateSiteMap(insteads);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
