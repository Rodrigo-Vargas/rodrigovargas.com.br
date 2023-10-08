import "../main.css";
import { allPosts, Post } from "contentlayer/generated";

type HomePageProps = {
   posts: Post[];
};

const HomePage = ({ posts }: HomePageProps) => {
   return (
      <div className="container">
         <div className="hero">
            <h1 className="text-center text-7xl font-thin">Rodrigo Vargas</h1>
         </div>

         {posts.map((post) => {
            return (
               <div>
                  <h1 className="">{post.title}</h1>
                  <div
                     dangerouslySetInnerHTML={{ __html: post.body.html }}
                  ></div>
               </div>
            );
         })}
      </div>
   );
};

export async function getStaticProps() {
   const posts = allPosts;
   return {
      props: {
         posts,
      },
   };
}

export default HomePage;
