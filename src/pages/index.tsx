import { allPosts, Post } from "contentlayer/generated";
import HomeCard from "../components/HomeCard";

type HomePageProps = {
   posts: Post[];
};

const HomePage = ({ posts }: HomePageProps) => {
   return (
      <div className="w-full">
         <div className="container">
            <div className="mx-auto">
               {posts.map((post, index) => {
                  return (
                     <HomeCard key={index} post={post} />
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export async function getStaticProps() {
   const posts = allPosts.sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
  
   return {
      props: {
         posts,
      },
   };
}

export default HomePage;
