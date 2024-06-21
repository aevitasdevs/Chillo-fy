import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Components/Login Logic/login';
import Home from './Components/home';
import ProtectedRoutes from './Components/protectedroutes'
import Songs from './Components/songs';
import LoggedIn from './Components/Login Logic/loggedin';
import { LoginContext } from './Contexts/LoginContext';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState((localStorage.getItem("token") !== null))
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    }, 
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/logout",
      element: <LoggedIn />
    },
    {
      path: "/songs",
      element: (<ProtectedRoutes>
        <Songs />
      </ProtectedRoutes>)
    }
  ])

  return (
    <>
      <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <RouterProvider router={router} />
      </LoginContext.Provider>
    </>
  );
}


export default App;
