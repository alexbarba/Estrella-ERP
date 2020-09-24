import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import AuthLayout from "layouts/Auth.js";

import AdminLayout from "layouts/Admin.js";

import "assets/scss/material-dashboard-pro-react.scss?v=1.9.0";

const apolloClient = new ApolloClient({
  uri: "https://apollo-server-estrella.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});
const hist = createBrowserHistory();

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router history={hist}>
      <Switch>
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
