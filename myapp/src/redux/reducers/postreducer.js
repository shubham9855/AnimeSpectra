const initialState = {
  post: [],
};

export const postreducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIKE_POST":
      let partPost = {};
      state.post.forEach((obj) => {
        if (obj.postId === action.payload.postId) partPost = { ...obj };
      });

      partPost = {
        ...partPost,
        likes: [
          ...partPost.likes,
          { likeType: "like", userId: action.payload.userId },
        ],
      };
      const finPost = state.post.filter((item) => {
        return item.postId !== partPost.postId;
      });
      return {
        ...state,
        post: [...finPost, partPost],
      };

    case "DISLIKE_POST":
      let particularPost = {};
      state.post.forEach((obj) => {
        if (obj.postId === action.payload.postId) particularPost = { ...obj };
      });

      particularPost = {
        ...particularPost,
        likes: particularPost.likes.filter((item) => {
          return item?.userId !== action.payload.userId;
        }),
      };

      const finalPost = state.post.filter((item) => {
        return item.postId !== particularPost.postId;
      });
      return {
        ...state,
        post: [...finalPost, particularPost],
      };

    case "SET_POSTS":
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};
