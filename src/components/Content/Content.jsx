import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import bemCssModules from 'bem-css-modules'

import {default as ContentStyles } from './Content.module.scss'

import Courses from '../Courses/Courses';
import { StoreContext } from '../../store/StorePrivider';

const style = bemCssModules(ContentStyles);

const ADMIN_TYPE = 1;

const Content = () => {
  const { user } = useContext(StoreContext);

  const isUserLogged = Boolean(user);
  const isAdmin = user?.accessLevel === ADMIN_TYPE

  return (
    <main className={style()}>
      <Routes>
        <Route 
          path="/" 
          element={<Courses/>}
        />
        {isUserLogged && <Route 
          path="/my-courses" 
          element={<p>Kursy użytkownika</p> /*<Courses/>*/}
        />}
        {isAdmin && <Route 
          path="/manage-courses" 
          element={<p>Admin</p> /*<Courses/>*/}
        />}
        <Route 
          path="*" 
          element={<Navigate to="/"/>}
        />
      </Routes>
    </main>
  );
}

export default Content