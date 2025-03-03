import { IPostCard } from "../types";

const PostCard = ({ postCardData }: { postCardData: IPostCard }) => {
  return (
    <div className="max-w-[80rem] mx-auto w-full border-2 border-black rounded-xl p-2 flex gap-x-6 flex-row justify-center items-center overflow-hidden ">
      <img
        className="w-64 h-64 object-contain"
        src={`${postCardData.download_url}`}
        alt={postCardData.id}
      />
      <div className="flex flex-col justify-center items-start gaps-y-6 flex-start ">
        <h1>Auther: {postCardData.author}</h1>
        <p>
          width: {postCardData.width} height:{postCardData.height}
        </p>
        <p>{postCardData.url}</p>
      </div>
      <h1 className="text-6xl font-semibold p-2">{postCardData.id}</h1>
    </div>
  );
};

export default PostCard;
