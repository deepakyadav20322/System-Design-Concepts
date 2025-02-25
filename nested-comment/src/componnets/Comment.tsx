import  { Dispatch, SetStateAction, useState } from "react";
import { IcommentData } from "../types";
import { getRelativeTime } from "../timeFarmationg";

const Comments = ({
  commentTree,
  content,
  onSubmitComment,
  setContent,
  onEditComment,
  editContent,
  setEditContent,
  onDeleteComment,
  onUpVote,
}: {
  commentTree: IcommentData;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  editContent: string;
  setEditContent: Dispatch<SetStateAction<string>>;
  onSubmitComment: (commentId: number, content: string) => void;
  onEditComment: (commentId: number, content: string) => void;
  onDeleteComment: (commentId: number) => void;
  onUpVote:(commentId:number,vote:number)=>void;
}) => {
  // const [commentTreeData,setCommentTreeData] = useState<IcommentData[]>(commentTree)

  const [showReply, setShowReply] = useState<boolean>(false);
  const [isReplymode, setIsReplyMode] = useState<boolean>(false);
  const [isEdit, setIsedit] = useState<boolean>(false);

  const handleSubmit = (): void => {
    if (!content.trim()) return; // Prevent empty comments
    onSubmitComment(commentTree.id, content); // Pass correct types
    setIsReplyMode(false);
    setContent(""); // Clear input after submit
    setShowReply(true);
  };

  const handleEditSubmit = (): void => {
    onEditComment(commentTree.id, editContent);
    setIsedit(false);
    setEditContent("");
  };

  return (
    <>
      <div className="w-full p-2 text-start border-2 mx-2 my-1 border-l-3 border-l-cyan-600 rounded-xl ">
        <div className="flex justify-start items-center gap-x-4 pb-4">
          <span className="h-10 w-10 rounded-full border-black border-2 flex justify-center items-center">
            😄
          </span>
          <span className="font-bold">UserName{commentTree?.id}</span>
          <span className="text-red-500">👍- {commentTree.votes} </span>
          <span className="text-sm font-medium">{"("}{getRelativeTime(commentTree.timestamp)}{")"}</span>
        </div>
        {/* {Here we show the content of coment or replies} */}
        {isEdit ? (
          <textarea
            className="border-green-400 border-2 w-full my-2 p-1 outline-0"
            autoFocus
            onChange={(e) => setEditContent(e.target.value)}
            value={editContent || commentTree.content}
          />
        ) : (
          <div className="text-slate-500">{commentTree.content}</div>
        )}
        {/* handling tool boxes */}
        <div className="flex justify-start items-center gap-x-4">
          <button
            onClick={() => setIsReplyMode(!isReplymode)}
            className="cursor-pointer border-2 bg-blue-400 text-white rounded-2xl p-2 py-1"
          >
            Reply
          </button>
          <button
            onClick={() => onDeleteComment(commentTree.id)}
            className="cursor-pointer bg-red-500 border-2  text-white rounded-2xl p-2 py-1"
          >
            Delete
          </button>
          {!isEdit ? (
            <button
              onClick={() => setIsedit(!isEdit)}
              className="cursor-pointer border-2 bg-slate-300 text-black rounded-2xl px-3 py-1"
            >
              Edit
            </button>
          ) : (
            <button className=" cursor-pointer border-2 bg-green-400 text-white rounded-2xl p-2 py-1" onClick={handleEditSubmit}>
              Submit Edit
            </button>
          )}
          <button
            onClick={() => setShowReply(!showReply)}
            className="cursor-pointer border-2 hover:border-b-blue-400 px-1"
          >
            show Reply
          </button>
          <button onClick={(e)=>onUpVote(commentTree.id,commentTree?.votes ?? 0)} className="cursor-pointer">Upvote</button>
        </div>

        {isReplymode && (
          <>
            <textarea
              className="border-black border-2 w-full my-2 p-1"
              autoFocus
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button
              onClick={() => handleSubmit()}
              className="border border-amber-400"
            >
              Submit
            </button>
          </>
        )}
      </div>

      {showReply &&
        commentTree.replies &&
        commentTree.replies.length > 0 &&
        commentTree.replies.map((reply) => (
          <div className="ml-8" key={reply.id + ""}>
            <Comments
              key={reply.id + ""}
              commentTree={reply}
              onSubmitComment={onSubmitComment}
              content={content}
              setContent={setContent}
              onEditComment={onEditComment}
              editContent={editContent}
              setEditContent={setEditContent}
              onDeleteComment={onDeleteComment}
              onUpVote={onUpVote}
            />
          </div>
        ))}
    </>
  );
};

export default Comments;
