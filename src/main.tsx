import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import "./styles/theme.css";
import { AppContextProvider } from "./context/AppContext";
import { getOrders } from "./apihelper";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    loader: getOrders,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </React.StrictMode>
);
