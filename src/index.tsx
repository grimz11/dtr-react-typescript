import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.less";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "mobx-react";
import initializeStores from "./stores/storeInitializer";

const stores = initializeStores();

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
