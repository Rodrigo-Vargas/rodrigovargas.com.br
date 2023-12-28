const RecommendedPosts = ({nextPost, prevPost}) => {
   return (
      <div className="flex my-10">
         <div className="w-1/2">
            {
               prevPost && (
                  <a className="hover:bg-gray-100 py-12 px-5 block text-blue-600" href={prevPost.url}>{prevPost.title}</a>
               )
            }
         </div>
         <div className="w-1/2">
         {
            nextPost && (
               <a className="hover:bg-gray-100 py-12 px-5 block text-right text-blue-600" href={nextPost.url}>{nextPost.title}</a>
            )
         }
         </div>
      </div>
   )
};

export default RecommendedPosts;