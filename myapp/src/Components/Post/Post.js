import React, { useEffect, useState } from "react";
import iconImage from "../../images/jjk.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Post.css";
// import Comment from "../Comment/Commt";
import useNode from "../hooks/useNode";
import { useParams, useNavigate } from "react-router-dom";
import Comments from "../Comment/Comments";
import { useJwt } from "react-jwt";
// import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { likepost } from "../../redux/action/postaction";
import { dislikepost } from "../../redux/action/postaction";
import { setpost } from "../../redux/action/postaction";
import {
  setcommentspost,
  setpostdislike,
  setpostlike,
} from "../../redux/action/commentaction";

const Post = () => {
  // const [commentsData, setCommentsData] = useState(comments);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postData = useSelector((state) => state.commentreducer.post);
  let isLiked = false;
  const [like, setLike] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch(setcommentspost(data.post));
        setLike(data.post?.likes?.length);
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
    if (token === null) {
      navigate("/login");
    }

    try {
      dispatch(setpostdislike({ postId: id, userId: decodedToken.userId }));
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
      // isLiked = false;
      // window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };
  const handleLikeClick = async (id) => {
    if (token === null) {
      navigate("/login");
    }

    try {
      dispatch(setpostlike({ postId: id, userId: decodedToken.userId }));
      isLiked = false;
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
    } catch (error) {
      setError(error.message);
    }
  };

  if (token !== null) {
    postData?.likes?.map((obj) => {
      if (obj?.userId === decodedToken?.userId) isLiked = true;
    });
  }
  return (
    <div className="postCompnent-post-container">
      <div className="postCompnent-icon-container">
        <div className="postCompnent-icon-image">
          <img src={postData.user?.profileUrl} />
        </div>
        <div className="postCompnent-icon-name">
          <span>{postData.user?.userName}</span>
        </div>
        <div className="postCompnent-icon-date"></div>
      </div>
      <div className="postCompnent-post-content">
        <div className="postCompnent-post-title">
          <span>{postData?.title}</span>
        </div>
        <div className="postCompnent-post-desc">
          <span>{postData?.description}</span>
        </div>
        <div className="postCompnent-post-image-box">
          {postData.images?.map((item) => {
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
              <svg
                className="homepost-like"
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleDislikeClick(id)}
              >
                <g transform="translate(0 -1028.4)">
                  <path
                    d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
                    fill="#dba570"
                  />
                </g>
              </svg>
            ) : (
              <svg
                className="homepost-like"
                width="23px"
                height="23px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleLikeClick(id)}
              >
                <g transform="translate(0 -1028.4)">
                  <path
                    d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
                    stroke="#ffffff" // White border
                    strokeWidth="2" // Adjust the thickness of the border as needed
                  />
                </g>
              </svg>
            )}
          </div>
          <span>{postData?.likes?.length}</span>
        </div>
      </div>
      <div className="comment">
        <Comments
          postID={id}
          commentData={postData?.comments}
          currentUserId={postData?.userId}
        ></Comments>
      </div>
    </div>
  );
};

export default Post;
