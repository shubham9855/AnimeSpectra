import "./CreatePost.css";
import { useState, useEffect } from "react";

export const CreatePost = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [imageUpload, setImageUpload] = useState(false);

  useEffect(() => {}, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const changeFlag = (val) => {
    setImageUpload(val);
  };

  const selectedImageButtonStyle = imageUpload ? "image-button-selected" : "";
  const selectedButtonStyle = imageUpload ? "" : "post-button-selected";

  return (
    <div className="form-main">
      <div className="form-container">
        <div className="form-heading">
          <div className="form-heading-text">
            <span>Create a post</span>
          </div>
          <div className="form-heading-line"></div>
        </div>
        <div className="form-dropDown">
          <select value={selectedOption} onChange={handleOptionChange}>
            <option value="">Choose a Community</option>
            <option value="option1">Option 1</option>
            <option value="option2">shubh</option>
            <option value="option3">shubham</option>
          </select>
        </div>

        <div className="form-area">
          <div className="form-upload">
            <div
              onClick={() => changeFlag(false)}
              className={`form-post ${selectedButtonStyle}`}
            >
              <span>Post</span>
            </div>
            <div
              onClick={() => changeFlag(true)}
              className={`form-image ${selectedImageButtonStyle}`}
            >
              <span>Image</span>
            </div>
          </div>
          {imageUpload ? (
            <div className="image-upload">
              <label for="images" class="drop-container" id="dropcontainer">
                <span class="drop-title">Drop files here</span>
                or
                <input className="file-input" type="file" required></input>
              </label>
            </div>
          ) : (
            <form className="post-create">
              <input
                className="form-title"
                autoFocus
                placeholder="Title"
                type="text"
              ></input>
              <textarea
                className="post-content"
                placeholder="Text(optional)"
                type="textArea"
              ></textarea>
            </form>
          )}
          <div className="form-buttonwrapper">
            <button className="form-button">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};
