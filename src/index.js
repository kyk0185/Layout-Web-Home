import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducers from "./reducers";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./components/users/Users";
import Admin from "./Admin";
import Login from "./components/login/Login";
import * as serviceWorker from "./serviceWorker";

const store = createStore(rootReducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/users/:role_no" component={Users} />
        <Route path="/admin" component={Admin} />
      </div>
    </Router>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
