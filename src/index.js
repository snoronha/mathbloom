/*!

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { addStyles } from "react-mathquill";
import { Provider } from "react-redux";
import store from "stores/stores";

// core components
import Admin from "layouts/Admin";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();
addStyles();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/about" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
