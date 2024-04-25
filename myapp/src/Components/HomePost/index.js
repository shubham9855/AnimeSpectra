import "./HomePost.css";
import PostJson from "../../Dataset/PostJson";
import iconImage from "../../images/jjk.jpg";

export const HomePost = () => {
  return (
    <>
      {PostJson.map((item) => {
        return (
          <div className="homepost-main">
            <div className="homepost-user">
              <div className="user-img">
                <img className="homepost-user-img" src={iconImage}></img>
              </div>
              <div className="user-name">{item.user}</div>
            </div>
            <hr></hr>
            <div className="homepost">
              <div className="homepost-content">{item.Description}</div>
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
