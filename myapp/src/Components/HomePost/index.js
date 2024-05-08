import "./HomePost.css";
// import PostJson from "../../Dataset/PostJson";
import iconImage from "../../images/jjk.jpg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useJwt } from "react-jwt";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";

export const HomePost = () => {
  const [like, setLike] = useState(0);
  const [PostJson, setPostJson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [isLiked, setisLiked] = useState(false);
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);

  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/posts`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const post = await response.json();
        setPostJson(post?.posts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
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
    } catch (error) {
      setError(error.message);
    }
  };
  const handleLikeClick = async (id) => {
    if (token === null) {
      navigate("/login");
    }
    try {
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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {PostJson.map((item) => {
        const postLike = item.likes.length;
        let isLiked = false;
        if (token !== null) {
          item.likes.map((obj) => {
            if (obj?.userId === decodedToken?.userId) isLiked = true;
          });
        }
        return (
          <div className="homepost-main">
            <div className="homepost-user">
              <div className="user-img">
                <img
                  className="homepost-user-img"
                  src={item.user.profileUrl}
                ></img>
              </div>
              <div className="user-name">{item.user.userName}</div>
            </div>
            {/* <hr></hr> */}
            <div
              className="homepost"
              onClick={() => handleNavigate(item.postId)}
            >
              <div className="homepost-content">{item.title}</div>
              <div className="homepost-image">
                <img src={iconImage} className="homepost-img"></img>
              </div>
            </div>
            <hr></hr>
            <div className="homepost-footer">
              <div className="homepost-upvote">
                {isLiked ? (
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    onClick={() => handleDislikeClick(item.postId)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    onClick={() => handleLikeClick(item.postId)}
                  />
                )}
                <div className="upvote-count">{item.likes.length}</div>
              </div>
              <div
                className="homepost-comment"
                onClick={() => handleNavigate(item.postId)}
              >
                Comment
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
