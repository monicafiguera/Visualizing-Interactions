import React 	from "react";
import ReactDOM from "react-dom";

import App 	    from "./App";


import { createStore,
         applyMiddleware } from "redux";
import thunk               from "redux-thunk";
import ontarioApp 	       from "../redux-state/reducers";

const store = createStore(
  ontarioApp,
  applyMiddleware(
    thunk
  )
);

ReactDOM.render(
  <App store={store}/>,
  document.getElementById('content')
);