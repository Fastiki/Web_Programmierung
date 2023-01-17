import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import Post from './post';
import Main from './main';
import Profile from './profile';
import Signin from './login';
import Signup from './signup';
import Search from './search';


import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
  Link,
  Navigate
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/:username" element={<Main />} />
      <Route path="/search/:username/:searchterm" element={<Search />} />
      <Route path="/post/:username" element={<Post />} />
      <Route path="/profile/:username/:profileusername" element={<Profile />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup/:username/:userpassword" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);
