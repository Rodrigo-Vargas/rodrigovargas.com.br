import { Post, allPosts } from "contentlayer/generated";

type BlogDetailPageProps = {
   post: Post;
}

const BlogDetailPage = ({ post }: BlogDetailPageProps) => {
   return (
      <div className="container">
         <h1 className="text-center my-10 text-5xl">{post.title}</h1>
         <div dangerouslySetInnerHTML={{ __html: post.body.html }}></div>
      </div>
   )
};

export async function getStaticProps({ params }) {
   const post = allPosts.find((post) => (post._id === params.slug));
   return { props: { post } };
}

export const getStaticPaths = () => {
   return {
      paths: [
         ...allPosts.map(post => ({
            params: { slug: post._id }
         }))
      ],
      fallback: false
   }
};


export default BlogDetailPage;