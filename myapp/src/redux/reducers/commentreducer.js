const initialState = {
  post: {},
};

export const commentreducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      console.log("add commment hit");
      return {
        ...state,
        comments: [...comments, action.payload],
      };

    case "SET_COMMENTS_POST":
      console.log("set commment hit");
      console.log("post value after isliked", action.payload);
      return {
        ...state,
        post: action.payload,
      };

    case "SET_POST_LIKE":
      // console.log("post like hit");
      console.log("like hit and payload", action.payload);
      let partPost = state.post;
      console.log("like hit on this post", partPost);

      partPost = {
        ...partPost,
        likes: [
          ...partPost.likes,
          { likeType: "like", userId: action.payload.userId },
        ],
      };
      // console.log("particulart psot after ADD user", partPost);
      // const finPost = state.post.filter((item) => {
      //   return item.postId !== partPost.postId;
      // });
      // console.log([...finPost, partPost]);
      return {
        ...state,
        post: partPost,
      };

    case "SET_POST_DISLIKE":
      console.log("post dislike hit");
      //  console.log("dislike hit and payload", action.payload);
      let particularPost = state.post;
      console.log("dislike hit on this post", particularPost);

      particularPost = {
        ...particularPost,
        likes: particularPost.likes.filter((item) => {
          return item?.userId !== action.payload.userId;
        }),
      };
      console.log("particulart psot after remove user", particularPost);
      // const finalPost = state.post.filter((item) => {
      //   return item.postId !== particularPost.postId;
      // });
      // console.log([...finalPost, particularPost]);
      return {
        ...state,
        post: particularPost,
      };

    default:
      return state;
  }
};
