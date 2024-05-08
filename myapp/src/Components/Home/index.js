import { HomePost } from "../HomePost";
import { useNavigate } from "react-router-dom";
import { isExpired, useJwt } from "react-jwt";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { decodedToken, isExpired } = useJwt(token);
  const handleFocus = () => {
    navigate("/createpost");
  };
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

        <HomePost />
      </div>
    </>
  );
};
