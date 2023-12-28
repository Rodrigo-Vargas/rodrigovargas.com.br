import { Post, allPosts } from "contentlayer/generated";
import hljs from "highlight.js";
import { useEffect } from "react";
import BlogPostTemplate from "src/templates/BlogPost";

type BlogDetailPageProps = {
  post: Post;
  nextPost: Post;
  prevPost: Post;
};

const BlogDetailPage = ({ post, nextPost, prevPost }: BlogDetailPageProps) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <BlogPostTemplate post={post} nextPost={nextPost} prevPost={prevPost} />
  );
};

export async function getStaticProps({ params }) {
  const posts = allPosts.sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  const currentPostIndex = posts.findIndex((post) => post._raw.flattenedPath === params.slug);
  const prevPost = posts[currentPostIndex + 1] ?? null;
  const nextPost = posts[currentPostIndex - 1] ?? null;

  return {
    props: {
      post,
      nextPost,
      prevPost
    }
  };
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
