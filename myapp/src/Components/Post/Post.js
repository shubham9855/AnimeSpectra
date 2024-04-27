import React, { useState } from "react";
import iconImage from "../../images/jjk.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import "./Post.css";
import Comment from "../Comment/Commt";
import useNode from "../hooks/useNode";
// import "./styles.css";

const comments = {
  id: 1,
  items: [],
};
var likes = 500;

const Post = () => {
  const [commentsData, setCommentsData] = useState(comments);
  const [like, setLike] = useState(likes);
  const [isLiked, setisLiked] = useState(false);

  console.log("initial comments", comments);
  const handleClick = () => {
    if (isLiked) {
      likes = likes - 1;
      setLike(likes);
      setisLiked(false);
    } else {
      likes = likes + 1;
      setLike(likes);
      setisLiked(true);
    }
  };

  // const { insertNode, editNode, deleteNode } = useNode();

  // const handleInsertNode = (folderId, item) => {
  //   const finalStructure = insertNode(commentsData, folderId, item);
  //   console.log(finalStructure);
  //   setCommentsData(finalStructure);
  // };

  // const handleEditNode = (folderId, value) => {
  //   const finalStructure = editNode(commentsData, folderId, value);
  //   setCommentsData(finalStructure);
  // };

  // const handleDeleteNode = (folderId) => {
  //   const finalStructure = deleteNode(commentsData, folderId);
  //   const temp = { ...finalStructure };
  //   setCommentsData(temp);
  // };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="postCompnent-post-container">
        <div className="postCompnent-icon-container">
          <div className="postCompnent-icon-image">
            <img src={iconImage} />
          </div>
          <div className="postCompnent-icon-name">
            <span>Ashu</span>
          </div>
          <div className="postCompnent-icon-date">
            <span>1 day ago</span>
          </div>
        </div>
        <div className="postCompnent-post-content">
          <div className="postCompnent-post-title">
            <span>SRK at the Ambani pre-wedding ceremony.</span>
          </div>
          <div className="postCompnent-post-desc">
            <span>He is looking handsome He is looking handsomendsome</span>
          </div>
          <div className="postCompnent-post-image-box">
            <div className="postCompnent-post-image">
              <img
                style={{ height: "90%", width: "90%", marginTop: "20px" }}
                src={iconImage}
              ></img>
            </div>
            <div className="postCompnent-post-image">
              <img
                style={{ height: "90%", width: "90%", marginTop: "20px" }}
                src={iconImage}
              ></img>
            </div>
            <div className="postCompnent-post-image">
              <img
                style={{ height: "90%", width: "90%", marginTop: "20px" }}
                src={iconImage}
              ></img>
            </div>
          </div>
        </div>

        <div className="postCompnent-post-engagment">
          <div className="postComponent-post-votes">
            <div className="postComponent-like">
              {isLiked ? (
                <FontAwesomeIcon icon={faThumbsDown} onClick={handleClick} />
              ) : (
                <FontAwesomeIcon icon={faThumbsUp} onClick={handleClick} />
              )}
            </div>
            <span>{like}</span>
            {/* <div className="postCompnent-dislike">
              <FontAwesomeIcon icon={faThumbsDown} />
            </div> */}
          </div>
          {/* <div className="postCompnent-comment">
            <FontAwesomeIcon icon={faComment} />
          </div> */}
        </div>
      </div>
      <div className="comment">
        {/* <Comment
          handleInsertNode={handleInsertNode}
          handleEditNode={handleEditNode}
          handleDeleteNode={handleDeleteNode}
          comment={commentsData}
        /> */}
      </div>
    </div>
  );
};

export default Post;
