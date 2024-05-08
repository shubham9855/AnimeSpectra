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
  }, [like]);

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
      setLike(15);
      // window.location.reload();
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
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleDislikeClick(item.postId)}
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
                    width="18px"
                    height="18px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => handleLikeClick(item.postId)}
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
