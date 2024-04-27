import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import { useState, useEffect } from "react";

export const CreatePost = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [imageUpload, setImageUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [TitleDesc, setTitleDesc] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const changeFlag = (val) => {
    setImageUpload(val);
  };

  const handleClickPost = async () => {
    console.log("title", title);
    console.log("desc", TitleDesc);
    console.log("selectedoption", selectedOption);
    console.log("fiel", file);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            photos: file,
            title: title,
            description: TitleDesc,
            communityId: selectedOption,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      console.log(response);
      navigate("/");
      // Handle successful login
      console.log("Login successful");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
                <input
                  className="file-input"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                ></input>
              </label>
            </div>
          ) : (
            <form className="post-create">
              <input
                className="form-title"
                autoFocus
                placeholder="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <textarea
                className="post-content"
                placeholder="Text(optional)"
                type="textArea"
                value={TitleDesc}
                onChange={(e) => setTitleDesc(e.target.value)}
              ></textarea>
            </form>
          )}
          <div className="form-buttonwrapper">
            <button className="form-button" onClick={handleClickPost}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
