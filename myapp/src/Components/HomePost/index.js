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
  // const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
  const handleNavigate = (id) => {
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(`${process.env.REACT_APP_BACKEND_URL}/api/posts`);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/posts`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const post = await response.json();
        console.log(post);
        setPostJson(post?.posts);
        console.log(PostJson);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  });

  if (loading) {
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

  return (
    <>
      {PostJson.map((item) => {
        const postLike = item.likes.length;
        console.log("item.length", postLike);
        let isLiked = false;
        item.likes.map((obj) => {
          console.log("obj", obj.userId);
          console.log("decodetoken id", decodedToken.userId);
          if (obj.userId === decodedToken.userId) isLiked = true;
        });
        console.log("postcontet ", item);
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
                {/* <div className="down">-</div> */}
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
