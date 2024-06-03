import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Login from './components/login';
import Song from './components/songs';
import Playlists from './components/playlists';
import React from 'react';

function App() {
  return (
    <>
      <ul>
        <li>
          <button>
            <Link to="./components/songs">Songs</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="./components/login">Login</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="./components/playlists">Playlists</Link>
          </button>
        </li>
      </ul>

      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='./components/songs' element={<Song />} />
        <Route path='./components/login' element={<Login />} />
        <Route path='./components/playlists' element={<Playlists />} />
      </Routes>
    </>
  );
}

export default App;
