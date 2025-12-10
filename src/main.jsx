import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './components/Layout/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllProducts from './components/allProducts/AllProducts.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'/allProducts',
        Component:AllProducts
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />,
  </StrictMode>,
)
