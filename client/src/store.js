// creates a Redux store that holds the complete state tree of the app
// store  sends application state to our React components, which will react accordingly to that state.
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
const initialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
  )
);
export default store;