import { Post } from "contentlayer/generated";

type HomeCardProps = {
   post: Post
}

const HomeCard = ({ post }: HomeCardProps) => {
   return (
      <a href={post._id} className="flex flex-row mb-10 hover:underline">
         <div className="w-full px-3 py-1">
            <h1 className="text-xl font-semibold mb-3">{post.title}</h1>
         </div>
      </a>
   );
};

export default HomeCard;