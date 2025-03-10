import React, { useState } from "react";
import { IcommentData } from "../types";
import Comments from "./Comment";
import useCommentHook from "../hooks/useCommentHook";

const NestedComment = ({ commentTree }: { commentTree: IcommentData[] }) => {
  const [commentTreeData, setCommentTreeData] =
    useState<IcommentData[]>(commentTree);
  const [content, setContent] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  const { addCommentNode, editNode ,deleteNode,upVote} = useCommentHook({
    commentTreeData,
    setCommentTreeData,
  });

  const handleSubmit = (commentId: number, content: string) => {
    addCommentNode(commentId, content);
  };
  const handleEditSubmit = (commentId: number, content: string) => {
    editNode(commentId, content);
  };
     const handleDeleteComment = (commentId:number)=>{
        deleteNode(commentId);

     }
     const handleUpvote = (commentId:number,vote:number)=>{
         upVote(commentId,vote)
     }

     if(commentTreeData && commentTreeData?.length==0){
        return <p> No any comment available</p>
    }

  return (
    <div className="overflow-hidden">
      {commentTreeData &&
        commentTreeData.map((comment) => (
         
          <Comments
            key={comment.id + ""}
            commentTree={comment}
            onSubmitComment={handleSubmit}
            content={content}
            setContent={setContent}
            onEditComment={handleEditSubmit}
            setEditContent={setEditContent}
            editContent={editContent}
            onDeleteComment={handleDeleteComment}
            onUpVote={handleUpvote}
         
          />
         
        ))}
    </div>
  );
};

export default NestedComment;
