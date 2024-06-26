import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Components/Login Logic/login';
import Home from './Components/home';
import ProtectedRoutes from './Components/protectedroutes'
import Songs from './Components/Song Logic/songs';
import LoggedIn from './Components/Login Logic/loggedin';
import { LoginContext } from './Contexts/LoginContext';
import { useState } from 'react';
import SongMenu from './Components/Song Logic/songsMenu';
import UploadSong from './Components/Song Logic/uploadsong';
import DeleteSong from './Components/Song Logic/DeleteSong';

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
      element: (<ProtectedRoutes><SongMenu /></ProtectedRoutes>)

      //<ProtectedRoutes>
      // <Songs />
      // </ProtectedRoutes>
    },
    {
      path:"/hear",
      element: <Songs />
    },
    {
      path: "/upload",
      element: <UploadSong />
    },
    {
      path: "/delete",
      element: <DeleteSong />
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
