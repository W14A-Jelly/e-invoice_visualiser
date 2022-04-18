import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Login from './Login'
import Register from './Register';
import Main from './Main'
import Profile from './Profile'
import Filter from './Filter'
import Graph from './Graph'
import Blacklist from './Blacklist';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Login/>} />
          <Route path = "/register" element = {<Register/>} />
          <Route path = "/file" element = {<Main/>} />
          <Route path = "/profile" element = {<Profile/>} />
          <Route path = "/filter" element = {<Filter/>} />
          <Route path = "/graph" element = {<Graph/>} />
          <Route path = "/blacklist" element = {<Blacklist/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
