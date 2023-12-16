import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const BlogPostTemplate = ({post}) => {
   return (
      <>
         <Head>
            <title>Rodrigo Vargas - {post.title}</title>
         </Head>
         <div className="container py-10">

            <Link href="/" className="meta d-block">
               <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                  <Image src="/images/avatar.jpg" alt="Author's Avatar" width={500} height={500} />
               </div>
               <p className="text-center py-5 text-lg tracking-wide">RODRIGO VARGAS</p>
            </Link>

            <div className="post">
               <h1 className="text-center my-10 text-4xl font-extralight">
                  {post.title}
               </h1>
               <div dangerouslySetInnerHTML={{ __html: post.body.html }}></div>
            </div>
         </div>
      </>
   );
};

export default BlogPostTemplate;