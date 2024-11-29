import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Home from './pages/home/Home';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/login/Login';
import './styles/global.css'
import Item from './pages/item/Item';

function App() {

  const Layout = () => {
    return (
      <div className="mainContainer">
        <Navbar />
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
    )
  }




  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{
        path: "/",
        element: <Home />
      }]
    },
    {
      path: "/login",
      element: <Login />
    },{
      path:"/item/:id",
      element:<Item/>
      
    }
  ]);

  return (
    < RouterProvider router={router} />
  )
}

export default App
