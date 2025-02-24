import { Dispatch, SetStateAction } from "react";
import { IcommentData } from "../types";

const useCoommentHook = ({
  setCommentTreeData,
}: {
  commentTreeData: IcommentData[];
  setCommentTreeData: Dispatch<SetStateAction<IcommentData[]>>;
}) => {


  // add the comment and replies on besis of comming Id:-
  const addCommentNode = (
    tree: IcommentData[],
    commentId: number,
    content: string
  ): IcommentData[] => {
    return tree.map((comment) => {
      // here structure a new comment

      if (commentId == comment.id) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: Date.now(), // Unique ID
              content,
              votes: 0,
              timestamp: new Date().toISOString(),
              replies: [],
            },
          ],
        };

        // now we nestedly go deeper in tree like DFS
      } else if (comment && comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addCommentNode(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };

  const editNode = (
    tree: IcommentData[],
    commentId: number,
    content: string
  ): IcommentData[] => {
    if (commentId == null) {
      return tree;
      // not make any changes
    }

    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content,
          timestamp: new Date().toISOString(),
        };
      } else if (comment.replies && comment.replies?.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, commentId, content),
        };
      }

      return comment;
    });
  };

  const deleteNode = (
    tree: IcommentData[],
    commentId: number
  ): IcommentData[] => {
    return tree
      .filter((comment) => comment.id !== commentId)
      .map((comments,ind) => {
        if (comments.replies && comments.replies.length) {
          return {
            ...comments,
            replies: deleteNode(comments.replies, commentId) || [],
          };
        }
       console.log(ind)
        return comments;
      });
  };

  // Function to update state immutably
  const handleAddComment = (commentId: number, content: string) => {
    setCommentTreeData((prevTree) =>
      addCommentNode(prevTree, commentId, content)
    );
  };

  const handleEditComment = (commentId: number, content: string) => {
    setCommentTreeData((prevTree) => editNode(prevTree, commentId, content));
  };

  const handleDeleteComment = (CommentId: number) => {
    setCommentTreeData((prevTree) => deleteNode(prevTree, CommentId));
  };
  return {
    addCommentNode: handleAddComment,
    editNode: handleEditComment,
    deleteNode: handleDeleteComment,
  };
};

export default useCoommentHook;
