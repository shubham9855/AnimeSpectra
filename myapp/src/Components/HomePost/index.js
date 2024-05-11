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
              {item.images.length > 0 && (
                <div className="homepost-image">
                  <img
                    src={item.images[0].imageUrl}
                    className="homepost-img"
                  ></img>
                </div>
              )}
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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_901_2831)">
                    <path
                      d="M24 25H2C1.45 25 1 24.55 1 24V2C1 1.45 1.45 1 2 1H30C30.55 1 31 1.45 31 2V30C31 31 30.61 31.61 29 30L24 25Z"
                      fill="#dba570"
                    />
                    <path
                      d="M22 12C22.55 12 23 12.45 23 13C23 13.55 22.55 14 22 14C21.45 14 21 13.55 21 13C21 12.45 21.45 12 22 12ZM16 12C16.55 12 17 12.45 17 13C17 13.55 16.55 14 16 14C15.45 14 15 13.55 15 13C15 12.45 15.45 12 16 12ZM10 12C10.55 12 11 12.45 11 13C11 13.55 10.55 14 10 14C9.45 14 9 13.55 9 13C9 12.45 9.45 12 10 12Z"
                      fill="#dba570"
                    />
                    <path
                      d="M22 23L29 30C30.609 31.609 31 31 31 30V2C31 1.447 30.553 1 30 1H2C1.447 1 1 1.447 1 2V24C1 24.553 1.447 25 2 25H20M17 12.9912C17 12.4382 16.553 11.9912 16 11.9912C15.447 11.9912 15 12.4382 15 12.9912C15 13.5442 15.447 13.9912 16 13.9912C16.553 13.9912 17 13.5442 17 12.9912ZM23 12.9912C23 12.4382 22.553 11.9912 22 11.9912C21.447 11.9912 21 12.4382 21 12.9912C21 13.5442 21.447 13.9912 22 13.9912C22.553 13.9912 23 13.5442 23 12.9912ZM11 12.9912C11 12.4382 10.553 11.9912 10 11.9912C9.447 11.9912 9 12.4382 9 12.9912C9 13.5442 9.447 13.9912 10 13.9912C10.553 13.9912 11 13.5442 11 12.9912Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_901_2831">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
