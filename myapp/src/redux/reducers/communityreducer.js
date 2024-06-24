const initialState = {
  community: [],
};

export const communityreducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMMUNITY":
      console.log(action.payload);
      return {
        ...state,
        community: action.payload,
      };
    default:
      return state;
  }
};
