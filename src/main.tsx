import "./style/index.scss";
import "amfe-flexible";

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { router } from "./router";
import store from "./store/index.ts";

// import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
