import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  // updateComment,
  // deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const isReplying =
    activeComment &&
    activeComment.id === comment.commentId &&
    activeComment.type === "replying";
  const canReply = Boolean(currentUserId);
  const replyId = parentId ? parentId : comment.commentId;
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img src={comment.user.profileUrl} />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.user.userName}</div>
          {/* <div style={{ fontSize: "12px" }}>#{comment.timestamp}</div> */}
        </div>
        {<div className="comment-text">{comment.description}</div>}
        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.commentId, type: "replying" })
              }
            >
              Reply
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                addComment={addComment}
                parentId={comment.commentId}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
