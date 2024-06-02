const initialState = {
  post: {},
};

export const commentreducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...comments, action.payload],
      };

    case "SET_COMMENTS_POST":
      return {
        ...state,
        post: action.payload,
      };

    case "SET_POST_LIKE":
      let partPost = state.post;
      partPost = {
        ...partPost,
        likes: [
          ...partPost.likes,
          { likeType: "like", userId: action.payload.userId },
        ],
      };

      return {
        ...state,
        post: partPost,
      };

    case "SET_POST_DISLIKE":
      let particularPost = state.post;
      particularPost = {
        ...particularPost,
        likes: particularPost.likes.filter((item) => {
          return item?.userId !== action.payload.userId;
        }),
      };

      return {
        ...state,
        post: particularPost,
      };

    default:
      return state;
  }
};
