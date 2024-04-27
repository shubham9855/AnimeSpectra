import "./HomePost.css";
// import PostJson from "../../Dataset/PostJson";
import iconImage from "../../images/jjk.jpg";
import { useState, useEffect } from "react";

export const HomePost = () => {
  const [PostJson, setPostJson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

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
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {PostJson.map((item) => {
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
            <hr></hr>
            <div className="homepost">
              <div className="homepost-content">{item.title}</div>
              <div className="homepost-image">
                <img src={iconImage} className="homepost-img"></img>
              </div>
            </div>
            <hr></hr>
            <div className="homepost-footer">
              <div className="homepost-upvote">
                <div className="up">+</div>
                <div className="upvote-count">10</div>
                <div className="down">-</div>
              </div>
              <div className="homepost-comment">Comment</div>
            </div>
          </div>
        );
      })}
    </>
  );
};
