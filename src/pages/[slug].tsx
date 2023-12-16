import { Post, allPosts } from "contentlayer/generated";
import hljs from "highlight.js";
import { useEffect } from "react";
import BlogPostTemplate from "src/templates/BlogPost";

type BlogDetailPageProps = {
  post: Post;
};

const BlogDetailPage = ({ post }: BlogDetailPageProps) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <BlogPostTemplate post={post}/>
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
