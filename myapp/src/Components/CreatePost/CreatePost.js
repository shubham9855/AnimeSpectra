import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import { useState, useEffect } from "react";
// import CommunityJson from "../../CommunityJson";

export const CreatePost = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [Communitydata, setCommunityData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [imageUpload, setImageUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [TitleDesc, setTitleDesc] = useState("");
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/communities`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        console.log(data.communities);
        setCommunityData(data.communities);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
    // setCommunityData(CommunityJson);
  }, []);

  const handleFileChange = (e) => {
    setFile([...file, ...e.target.files]);
  };

  const handleOptionChange = (event) => {
    console.log("option cahnge");
    let option = event.target.value;
    console.log("target value", event.target.value);
    let id = "";
    Communitydata.map((item) => {
      if (option === item.communityName) id = item.communityId;
    });
    console.log("id", id);
    setSelectedId(id);
    setSelectedOption(option);
  };

  const changeFlag = (val) => {
    setImageUpload(val);
  };

  const handleClickPost = async () => {
    const formData = new FormData();
    console.log(selectedId);
    formData.append("title", title);
    formData.append("description", TitleDesc);
    formData.append("communityId", selectedId);
    // const fileObjects = [];

    // Append each file to the array
    file.forEach((photo) => {
      formData.append("photos", photo);
    });
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data"
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }

      navigate("/");
      // Handle successful login
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
            {Communitydata.map((item) => {
              return (
                <option value={item.communityName}>{item.communityName}</option>
              );
            })}
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
                  multiple
                  onChange={handleFileChange}
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
              {loading ? (
                <div style={{ color: "black" }}>loading!!!</div>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
