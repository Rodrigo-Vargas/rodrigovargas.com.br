import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import RecommendedPosts from "src/components/RecommendedPosts";

const BlogPostTemplate = ({post, nextPost, prevPost}) => {
   return (
      <>
         <Head>
            <title>Rodrigo Vargas - {post.title}</title>
            <meta name="og:title" content={post.title} />

            <meta name="description" content={post.excerpt} />
            <meta name="og:description" content={post.excerpt} />
         </Head>
         <div className="container py-10">

            <Link href="/">
               <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                  <Image src="/images/avatar.jpg" alt="Author's Avatar" width={500} height={500} />
               </div>
               <p className="text-center py-5 text-lg tracking-wide text-gray-500">RODRIGO VARGAS</p>
            </Link>

            <div className="post">
               <time className="text-center block text-gray-500" dateTime={post.publishedAt}>{format(parseISO(post.publishedAt), 'LLLL d, yyyy')}</time>
               <h1 className="text-center my-10 text-4xl font-extralight">
                  {post.title}
               </h1>
               <article dangerouslySetInnerHTML={{ __html: post.body.html }}></article>
            </div>

            <RecommendedPosts prevPost={prevPost} nextPost={nextPost} />
         </div>
      </>
   );
};

export default BlogPostTemplate;