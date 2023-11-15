import { Post, allPosts } from "contentlayer/generated";
import hljs from "highlight.js";
import { useEffect } from "react";
import Head from 'next/head';

type BlogDetailPageProps = {
  post: Post;
};

const BlogDetailPage = ({ post }: BlogDetailPageProps) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <>
      <Head>
         <title>Rodrigo Vargas - {post.title}</title>
      </Head>
      <div className="container post">
        <h1 className="text-center my-10 text-5xl font-extralight">
          {post.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.body.html }}></div>
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  return { props: { post } };
}

export const getStaticPaths = () => {
  return {
    paths: [
      ...allPosts.map((post) => ({
        params: { slug: post._raw.flattenedPath },
      })),
    ],
    fallback: false,
  };
};

export default BlogDetailPage;
