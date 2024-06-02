import { combineReducers } from "redux";
import { postreducer } from "./reducers/postreducer";
import { commentreducer } from "./reducers/commentreducer";

const rootReducer = combineReducers({
  postreducer,
  commentreducer,
});

export default rootReducer;
