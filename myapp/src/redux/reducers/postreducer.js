const initialState = {
  post: [],
};

export const postreducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIKE_POST":
      console.log("like red");
      // let partPost = {};
      // state.post.forEach((obj) => {
      //   if (obj.postId === action.payload.postId) partPost = { ...obj };
      // });

      // partPost = {
      //   ...partPost,
      //   likes: [
      //     ...partPost.likes,
      //     { likeType: "like", userId: action.payload.userId },
      //   ],
      // };
      // const finPost = state.post.filter((item) => {
      //   return item.postId !== partPost.postId;
      // });
      return {
        ...state,
        post: state.post.map((post) =>
          post.postId === action.payload.postId
            ? {
                ...post,
                likes: [
                  ...post.likes,
                  { likeType: "like", userId: action.payload.userId },
                ],
              }
            : post
        ),
      };

    case "DISLIKE_POST":
      console.log("dislike red");
      // let particularPost = {};
      // state.post.forEach((obj) => {
      //   if (obj.postId === action.payload.postId) particularPost = { ...obj };
      // });

      // particularPost = {
      //   ...particularPost,
      //   likes: particularPost.likes.filter((item) => {
      //     return item?.userId !== action.payload.userId;
      //   }),
      // };

      // const finalPost = state.post.filter((item) => {
      //   return item.postId !== particularPost.postId;
      // });
      return {
        ...state,
        post: state.post.map((post) =>
          post.postId === action.payload.postId
            ? {
                ...post,
                likes: post.likes.filter((item) => {
                  return item?.userId !== action.payload.userId;
                }),
              }
            : post
        ),
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
