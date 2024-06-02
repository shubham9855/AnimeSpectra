export const likepost = (id) => ({
  type: "LIKE_POST",
  payload: id,
});

export const dislikepost = (id) => ({
  type: "DISLIKE_POST",
  payload: id,
});

export const setpost = (item) => ({
  type: "SET_POSTS",
  payload: item,
});
