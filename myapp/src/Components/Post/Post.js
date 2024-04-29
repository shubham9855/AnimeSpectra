import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import Comments from "../Comment/Comments";
// import "./styles.css";

const comments = {
  id: 1,
  items: [],
};
var likes = 500;

const Post = () => {
  const [commentsData, setCommentsData] = useState(comments);
  const [like, setLike] = useState(likes);
  const [postData, setPostData] = useState({});
  const [isLiked, setisLiked] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log("post id ", id);
  console.log("initial comments", comments);

  useEffect(() => {
    console.log("fetch request made");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/posts/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("particular post ", data.post);
        setPostData(data.post);
        console.log(postData.images);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (Loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
    <div className="postCompnent-post-container">
      <div className="postCompnent-icon-container">
        <div className="postCompnent-icon-image">
          <img src="f3c6b9f1-7518-46ea-a983-da554978c1f3/40f91557-79f0-4b83-a6a3-8540c8f99143/1714413143949" />
        </div>
        <div className="postCompnent-icon-name">
          <span>{postData.user.userName}</span>
        </div>
        <div className="postCompnent-icon-date">
          {/* <span>postData.timestamp</span> */}
        </div>
      </div>
      <div className="postCompnent-post-content">
        <div className="postCompnent-post-title">
          <span>{postData.title}</span>
        </div>
        <div className="postCompnent-post-desc">
          <span>{postData.description}</span>
        </div>
        <div className="postCompnent-post-image-box">
          {postData.images.map((item) => {
            <div className="postCompnent-post-image">
              <img
                style={{ height: "90%", width: "90%", marginTop: "20px" }}
                src={item.imageUrl}
              ></img>
            </div>;
          })}
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
      <div className="comment">
        <Comments></Comments>
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
