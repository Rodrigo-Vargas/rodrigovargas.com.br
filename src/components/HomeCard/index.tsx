import { Post } from "contentlayer/generated";

type HomeCardProps = {
   post: Post
}

const HomeCard = ({ post }: HomeCardProps) => {
   return (
      <a href={post._id} className="flex flex-row hover:text-blue-600 rounded-md transition-all duration-500">
         <div className="w-full py-5 px-3">
            <h1 className="text-xl font-semibold">{post.title}</h1>
         </div>
      </a>
   );
};

export default HomeCard;