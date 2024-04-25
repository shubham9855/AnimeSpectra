import React, { useState } from "react";
import iconImage from "../../images/jjk.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import "./Post.css";
import Comment from "../Comment/Comment";
import useNode from "../hooks/useNode";
// import "./styles.css";

const comments = {
  id: 1,
  items: [],
};

const Post = () => {
  const [commentsData, setCommentsData] = useState(comments);
  console.log("initial comments", comments);

  const { insertNode, editNode, deleteNode } = useNode();

  const handleInsertNode = (folderId, item) => {
    const finalStructure = insertNode(commentsData, folderId, item);
    console.log(finalStructure);
    setCommentsData(finalStructure);
  };

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(commentsData, folderId, value);
    setCommentsData(finalStructure);
  };

  const handleDeleteNode = (folderId) => {
    const finalStructure = deleteNode(commentsData, folderId);
    const temp = { ...finalStructure };
    setCommentsData(temp);
  };
  return (
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
          <span>He is looking handsome</span>
        </div>
        <div className="postCompnent-post-image">
          <img src={iconImage} />
        </div>
      </div>

      <div className="postCompnent-post-engagment">
        <div className="postComponent-post-votes">
          <div className="postCompnent-like">
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          <span>540</span>
          <div className="postCompnent-dislike">
            <FontAwesomeIcon icon={faThumbsDown} />
          </div>
        </div>
        <div className="postCompnent-comment">
          <FontAwesomeIcon icon={faComment} />
        </div>
      </div>
      <div className="Apped">
        <Comment
          handleInsertNode={handleInsertNode}
          handleEditNode={handleEditNode}
          handleDeleteNode={handleDeleteNode}
          comment={commentsData}
        />
      </div>
    </div>
  );
};

export default Post;
