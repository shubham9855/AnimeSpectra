import { useNavigate } from "react-router-dom";
import "./CreatePost.css";
import { useState, useEffect } from "react";

export const CreatePost = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);

  const [selectedOption, setSelectedOption] = useState("");
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
  }, []);

  const handleFileChange = (e) => {
    setFile([...file, ...e.target.files]);
    // const files = Array.from(event.target.files);
    console.log("pics file", file);
    // setFile(files);
    // setFile(files);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const changeFlag = (val) => {
    setImageUpload(val);
  };

  const handleClickPost = async () => {
    console.log("files", file);
    const data = {
      title: title,
      description: TitleDesc,
      communityId: "5d2a58f2-5f1f-44ec-b9d8-756eda97426d",
      photos: [],
    };

    // Convert each file to base64 and add to data.photos array
    await Promise.all(
      file.map(async (photo) => {
        const base64 = await readFileAsBase64(photo);
        data.photos.push(base64);
      })
    );

    // Make your POST request here with data
    console.log("Data:", data);

    // Prevents the default form submission behavior
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("description", TitleDesc);
    // formData.append("communityId", selectedOption);
    // const fileObjects = [];

    // Append each file to the array
    // file.forEach((photo) => {
    //   fileObjects.push(photo);
    // });

    // Append the array to formData
    // formData.append("photos", JSON.stringify(fileObjects));
    // console.log("FormData:", formData);

    // file.forEach((photo, index) => {
    //   formData.append(`photos[${index}]`, photo);
    // });
    // for (let i = 0; i < file.length; i++) {
    //   formData.append(`photos`, file[i]);
    // }
    // console.log("formdata", formData);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/posts`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   photos: file,
          //   title: title,
          //   description: TitleDesc,
          //   communityId: "5d2a58f2-5f1f-44ec-b9d8-756eda97426d",
          // }),
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Login failed");
      }
      console.log("**correct***");
      console.log(response);
      navigate("/");
      // Handle successful login
      console.log("Login successful");
    } catch (error) {
      console.log("***error**");
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
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
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
