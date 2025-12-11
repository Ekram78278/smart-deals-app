import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./components/Home/Home.jsx";
import RootLayout from "./components/Layout/RootLayout.jsx";
import MyBids from "./components/MyBids/MyBids.jsx";
import MyProducts from "./components/MyProducts/MyProducts.jsx";
import Register from "./components/Register.jsx";
import AllProducts from "./components/allProducts/AllProducts.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/myProducts",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/myBids",
        element:<MyBids></MyBids>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
