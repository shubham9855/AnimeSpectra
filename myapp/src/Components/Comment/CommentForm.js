import { useState } from "react";
import { useNavigate } from "react-router-dom";
const CommentForm = ({
  handleSubmit,
  // submitLabel,
  // hasCancelButton = false,
  // handleCancel,
  initialText = "",
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = async (event) => {
    if (token === null) {
      navigate("/login");
    }
    event.preventDefault();
    handleSubmit(text);

    setText("");
  };
  return (
    <div className="add-comment-box">
      <div className="add-comment-input-box">
        <textarea
          className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="add-comment-button">
        <button
          className="comment-form-button"
          disabled={isTextareaDisabled}
          onClick={onSubmit}
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
