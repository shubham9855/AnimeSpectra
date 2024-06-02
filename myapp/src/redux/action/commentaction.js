export const addcomment = (item) => ({
  type: "ADD_COMMENT",
  payload: item,
});
export const setcommentspost = (item) => ({
  type: "SET_COMMENTS_POST",
  payload: item,
});
export const setpostlike = (item) => ({
  type: "SET_POST_LIKE",
  payload: item,
});
export const setpostdislike = (item) => ({
  type: "SET_POST_DISLIKE",
  payload: item,
});
