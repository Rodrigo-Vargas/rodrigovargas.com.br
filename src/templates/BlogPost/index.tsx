import Head from "next/head";

const BlogPostTemplate = ({post}) => {
   return (
      <>
         <Head>
            <title>Rodrigo Vargas - {post.title}</title>
         </Head>
         <div className="container py-10">

            <a href="/" className="meta d-block">
               <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                  <img src="/images/avatar.jpg" />
               </div>
               <p className="text-center py-5 text-lg tracking-wide">RODRIGO VARGAS</p>
            </a>

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