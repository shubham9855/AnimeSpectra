import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import "./Comment.css";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api";

const Comments = ({ postID, commentData, currentUserId }) => {
  const token = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [cmt, setCmt] = useState(0);
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  //extracted root comments to display
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  //extracted all the replies for a particular comment wrt to comment id
  const getReplies = (commentId) =>
    backendComments.filter(
      (backendComment) => backendComment.parentId === commentId
    );

  const addComment = async (text, parentId) => {
    let opComment = {};
    if (parentId === null) {
      opComment = {
        postId: postID,
        description: text,
        // parentId: parentId,
      };
    } else {
      opComment = {
        postId: postID,
        description: text,
        parentId: parentId,
      };
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/comments`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(opComment),
        }
      );
      if (!response.ok) {
        throw new Error("like failed");
      }
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setBackendComments(commentData);
  }, []);

  return (
    <div className="comments">
      <CommentForm handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.commentId)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
