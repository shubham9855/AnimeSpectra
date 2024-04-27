import { HomePost } from "../HomePost";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  const handleFocus = () => {
    navigate("/createpost");
  };
  return (
    <>
      <div className="home-main-container">
        <div className="home-createpost">
          <div className="createpost-info">
            <div className="createpost-img"></div>
            <div className="createpost-input">
              {/* <input
                type="textArea"
                className="post-input-field"
                placeholder="What's on your Mind !!!"
              /> */}
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
