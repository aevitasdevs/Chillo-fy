import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Components/login';
import Home from './Components/home';
import ProtectedRoutes from './Components/protectedroutes'
import Songs from './Components/songs';

function App() {
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
      path: "/songs",
      element: (<ProtectedRoutes>
        <Songs />
      </ProtectedRoutes>)
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}


export default App;
