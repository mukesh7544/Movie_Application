import React from "react";
import ReactDom from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import { Auth0Provider } from '@auth0/auth0-react';

ReactDom.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-hoeyio0dc5o2t54v.us.auth0.com"
    clientId="u0nwO66Sl7PtluWD8B6g08xiOSTtOhD0"
    authorizationParams={{
    redirect_uri: window.location.origin
    }}
  >
  <Provider store={store}>
  <BrowserRouter>
          <App/>
  </BrowserRouter>
  </Provider>
  </Auth0Provider>
);