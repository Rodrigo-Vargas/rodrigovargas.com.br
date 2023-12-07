import { allPosts } from "contentlayer/generated";

function generateSiteMap(posts) {
   return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://rodrigovargas.com.br</loc>
     </url>
     ${posts
         .map((post) => {
            return `
       <url>
           <loc>https://rodrigovargas.com.br/${post._raw.flattenedPath}}</loc>
       </url>
       <url>
           <loc>https://www.rodrigovargas.com.br/${post._raw.flattenedPath}}</loc>
       </url>
     `;
         })
         .join('')}
   </urlset>
 `;
}

function SiteMap() {
   // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
   const sitemap = generateSiteMap(allPosts);

   res.setHeader('Content-Type', 'text/xml');
   // we send the XML to the browser
   res.write(sitemap);
   res.end();

   return {
      props: {},
   };
}

export default SiteMap;