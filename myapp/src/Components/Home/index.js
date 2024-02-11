import { HomePost } from "../HomePost";
import "./Home.css";

export const Home = () => {
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
              />
            </div>
          </div>
          <hr></hr>
          <div className="createpost-share">
            <div className="share-upload">Upload</div>
            <div className="createpost-share-btn">Share</div>
          </div>
        </div>

        <HomePost />
      </div>
    </>
  );
};
