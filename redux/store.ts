import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userSlice from "./userSlice";

const initialState = {};
const reducer = combineReducers({ user: userSlice });
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof store.getState>;
export default store;
