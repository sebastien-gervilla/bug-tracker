import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AppProjects from './pages/AppProjects';
import AppProject from './pages/AppProject';
import AppProfile from './pages/AppProfile';
import AppTicket from './pages/AppTicket';
import AppTeam from './pages/AppTeam';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/account/login' element={<Login />} ></Route>
        <Route path='/app/projects' element={<AppProjects />} ></Route>
        <Route path='/app/projects/:id' element={<AppProject />} ></Route>
        <Route path='/app/tickets/:id' element={<AppTicket />} ></Route>
        <Route path='/app/team' element={<AppTeam />} ></Route>
        <Route path='/app/profile' element={<AppProfile />} ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;