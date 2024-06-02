const initialState = {
  post: [],
};

export const postreducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIKE_POST":
      console.log("like hit and payload", action.payload);
      let partPost = {};
      state.post.forEach((obj) => {
        console.log("obj.postId", obj.postId);
        console.log("action.payload.postId", action.payload.postId);
        if (obj.postId === action.payload.postId) partPost = { ...obj };
      });
      console.log("like hit on this post", partPost);

      (partPost = {
        ...partPost,
        likes: [
          ...partPost.likes,
          { likeType: "like", userId: action.payload.userId },
        ],
      }),
        console.log("particulart psot after ADD user", partPost);
      const finPost = state.post.filter((item) => {
        return item.postId !== partPost.postId;
      });
      console.log([...finPost, partPost]);
      return {
        ...state,
        post: [...finPost, partPost],
      };

    case "DISLIKE_POST":
      console.log("dislike hit and payload", action.payload);
      let particularPost = {};
      state.post.forEach((obj) => {
        console.log("obj.postId", obj.postId);
        console.log("action.payload.postId", action.payload.postId);
        if (obj.postId === action.payload.postId) particularPost = { ...obj };
      });
      console.log("dislike hit on this post", particularPost);

      particularPost = {
        ...particularPost,
        likes: particularPost.likes.filter((item) => {
          return item?.userId !== action.payload.userId;
        }),
      };
      console.log("particulart psot after remove user", particularPost);
      const finalPost = state.post.filter((item) => {
        return item.postId !== particularPost.postId;
      });
      console.log([...finalPost, particularPost]);
      return {
        ...state,
        post: [...finalPost, particularPost],
      };

    case "SET_POSTS":
      console.log("set reducer hit");
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};
