import { HomePost } from "../HomePost";
import { useNavigate } from "react-router-dom";
import { isExpired, useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setpost } from "../../redux/action/postaction";
import { setcommunity } from "../../redux/action/communityaction";
import "./Home.css";

export const Home = () => {
  const dispatch = useDispatch();
  const PostJson = useSelector((state) => state.postreducer.post);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Communitydata, setCommunityData] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  const handleFocus = () => {
    navigate("/createpost");
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
        dispatch(setpost(post?.posts));

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    const fetchComData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/communities?limit=50`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log("community", data);
        dispatch(setcommunity(data.communities));
        setCommunityData(data.communities);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchComData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="home-main-container">
        <div className="home-createpost">
          <div className="createpost-info">
            <div className="createpost-img">
              <img
                src={decodedToken?.profileUrl}
                style={{ height: "100%", width: "100%", borderRadius: "20px" }}
              ></img>
            </div>
            <div className="createpost-input">
              <textarea
                className="post-input-field"
                placeholder="What's on your Mind !!!"
                onFocus={handleFocus}
              />
            </div>
          </div>
        </div>

        <HomePost Posts={PostJson} />
      </div>
    </>
  );
};
