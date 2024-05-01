import Home from './components/landing/Home'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Error404 from './components/Error404';
import Loging from './components/user/Login';
import ProtectedRoutes from './components/utils/ProtectedRoutes';
import Reproductor from './components/reproductor/Reproductor'
import LogGout from './components/user/LogGout';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getUserbyId from './components/utils/getUserbyId';
import Player from './components/TheMusic/Player';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getUserbyId(dispatch);
  }, [])
  

  return (
    <>
      <Routes>
      <Route path='*' element={<Error404/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Loging />}/>
      <Route element={<ProtectedRoutes/>}>
        <Route path='/music' element={<Reproductor/>}/>
        <Route path='/player' element={<Player/>}/>
        <Route path='/dashboard' element={<Error404/>}/>
        <Route path='/logout' element={<LogGout/>}/>
      </Route>
      </Routes>
    </>
  )
}

export default App
