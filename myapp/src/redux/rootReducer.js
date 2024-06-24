import { combineReducers } from "redux";
import { postreducer } from "./reducers/postreducer";
import { commentreducer } from "./reducers/commentreducer";
import { communityreducer } from "./reducers/communityreducer";

const rootReducer = combineReducers({
  postreducer,
  commentreducer,
  communityreducer,
});

export default rootReducer;
