import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './Components/login';
import Home from './Components/home';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    }, 
    {
      path: "/login",
      element: <Login />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}


export default App;
