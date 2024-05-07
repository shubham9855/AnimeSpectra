import React, { useEffect, useState } from "react";
import iconImage from "../../images/jjk.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import "./Post.css";
// import Comment from "../Comment/Commt";
import useNode from "../hooks/useNode";
import { useParams } from "react-router-dom";
import Comments from "../Comment/Comments";
import { useJwt } from "react-jwt";
// import "./styles.css";

const comments = {
  id: 1,
  items: [],
};
// var likes = 500;

const Post = () => {
  // const [commentsData, setCommentsData] = useState(comments);
  const [like, setLike] = useState(0);
  const [postData, setPostData] = useState({});
  // const [isLiked, setisLiked] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  console.log("post id ", id);
  console.log("initial comments", comments);
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    console.log("fetch request made");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("particular post ", data.post);
        setPostData(data.post);
        // console.log(postData.images);
        console.log(data.post.postId);
        // console.log("fetched like ", fetchedLike);
        setLike(data.post.likes.length);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (Loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleDislikeClick = async (id) => {
    console.log("like handleclik");
    console.log("post id ", id);
    try {
      // setLike(like - 1);
      console.log("in if");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/votes`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("delete like failed");
      }
      setLike(1);
      // setisLiked(false);
      console.log("like deleted");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleLikeClick = async (id) => {
    console.log("post id ", id);
    try {
      // setLike(like + 1);
      console.log("in else");
      // console.log("new like", like);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/votes`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            voteType: "like",
            postId: id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("like failed");
      }
      setLike(1);
      // setisLiked(true);
      console.log("like deleted");
    } catch (error) {
      setError(error.message);
    }
  };

  // const { insertNode, editNode, deleteNode } = useNode();

  // const handleInsertNode = (folderId, item) => {
  //   const finalStructure = insertNode(commentsData, folderId, item);
  //   console.log(finalStructure);
  //   setCommentsData(finalStructure);
  // };

  // const handleEditNode = (folderId, value) => {
  //   const finalStructure = editNode(commentsData, folderId, value);
  //   setCommentsData(finalStructure);
  // };

  // const handleDeleteNode = (folderId) => {
  //   const finalStructure = deleteNode(commentsData, folderId);
  //   const temp = { ...finalStructure };
  //   setCommentsData(temp);
  // };

  let isLiked = false;
  // item.likes.map((obj) => {
  // console.log("obj", obj.userId);
  // console.log("decodetoken id", decodedToken.userId);
  if (postData.userId === decodedToken.userId) isLiked = true;
  // });
  return (
    <div className="postCompnent-post-container">
      <div className="postCompnent-icon-container">
        <div className="postCompnent-icon-image">
          <img src="" />
        </div>
        <div className="postCompnent-icon-name">
          <span>{postData.user.userName}</span>
        </div>
        <div className="postCompnent-icon-date">
          {/* <span>postData.timestamp</span> */}
        </div>
      </div>
      <div className="postCompnent-post-content">
        <div className="postCompnent-post-title">
          <span>{postData.title}</span>
        </div>
        <div className="postCompnent-post-desc">
          <span>{postData.description}</span>
        </div>
        <div className="postCompnent-post-image-box">
          {postData.images.map((item) => {
            return (
              <div className="postCompnent-post-image">
                <img
                  style={{ height: "90%", width: "90%", marginTop: "20px" }}
                  src={item.imageUrl}
                ></img>
              </div>
            );
          })}
        </div>
      </div>

      <div className="postCompnent-post-engagment">
        <div className="postComponent-post-votes">
          <div className="postComponent-like">
            {isLiked ? (
              <FontAwesomeIcon
                icon={faThumbsDown}
                onClick={() => handleDislikeClick(id)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faThumbsUp}
                onClick={() => handleLikeClick(id)}
              />
            )}
          </div>
          <span>{like}</span>
          {/* <div className="postCompnent-dislike">
              <FontAwesomeIcon icon={faThumbsDown} />
            </div> */}
        </div>
        {/* <div className="postCompnent-comment">
            <FontAwesomeIcon icon={faComment} />
          </div> */}
      </div>
      <div className="comment">
        <Comments
          postID={id}
          commentData={postData.comments}
          currentUserId={postData.userId}
        ></Comments>
        {/* <Comment
          handleInsertNode={handleInsertNode}
          handleEditNode={handleEditNode}
          handleDeleteNode={handleDeleteNode}
          comment={commentsData}
        /> */}
      </div>
    </div>
  );
};

export default Post;
