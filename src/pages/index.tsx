import Hero from "../components/Hero";
import { allPosts, Post } from "contentlayer/generated";
import HomeCard from "../components/HomeCard";

type HomePageProps = {
   posts: Post[];
};

const HomePage = ({ posts }: HomePageProps) => {
   return (
      <>
         <Hero />
         <div className="container mt-56 lg:mt-96">
            <div className="px-12">
               {posts.map((post, index) => {
                  return (
                     <HomeCard key={index} post={post} />
                  );
               })}
            </div>
         </div>
      </>
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
