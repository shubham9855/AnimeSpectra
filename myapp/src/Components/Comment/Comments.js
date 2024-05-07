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
  console.log("postid in comments", postID);
  console.log("commentdata in comments", commentData);
  console.log("currentUserid in comments", currentUserId);
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

  console.log("root comment", rootComments);

  //extracted all the replies for a particular comment wrt to comment id
  const getReplies = (commentId) =>
    backendComments.filter(
      (backendComment) => backendComment.parentId === commentId
    );
  // .sort(
  //   (a, b) =>
  //     new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  // );
  // console.log(getReplies);
  const addComment = async (text, parentId) => {
    console.log("comment added ", text, parentId);
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
      // createCommentApi(postID, text, parentId).then((comment) => {
      //   console.log("comment to be posted", comment);
      //   // console.log("comment to before update ", [comment, ...backendComments]);
      //   // setCmt(comment);
      //   // console.log("cmt", cmt);
      //   setActiveComment(null);
      // });
      console.log("comment to be published", opComment);
      console.log("sending comment req.");
      console.log("comment to backend comments", backendComments);
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
      // setCmt(1);
      window.location.reload();
      console.log("comment posted");
    } catch (error) {
      console.log("***********", error);
      setError(error.message);
    }
  };

  // const updateComment = (text, commentId) => {
  //   updateCommentApi(text).then(() => {
  //     const updatedBackendComments = backendComments.map((backendComment) => {
  //       if (backendComment.id === commentId) {
  //         return { ...backendComment, body: text };
  //       }
  //       return backendComment;
  //     });
  //     setBackendComments(updatedBackendComments);
  //     setActiveComment(null);
  //   });
  // };
  // const deleteComment = (commentId) => {
  //   if (window.confirm("Are you sure you want to remove comment?")) {
  //     deleteCommentApi().then(() => {
  //       const updatedBackendComments = backendComments.filter(
  //         (backendComment) => backendComment.id !== commentId
  //       );
  //       setBackendComments(updatedBackendComments);
  //     });
  //   }
  // };

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
            // deleteComment={deleteComment}
            // updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
