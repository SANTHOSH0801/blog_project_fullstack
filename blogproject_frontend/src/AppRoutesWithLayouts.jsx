import React from 'react';
import { AppRoutes } from './utils/Constant.js';
import { Routes, Route } from 'react-router-dom';

// Importing all the page components
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Home from './Pages/BlogListPage.jsx';
import BlogCreation from './Pages/BlogCreationPage.jsx';
import SingleBlog from './Pages/SingleBlog.jsx';
import EditBlog from './Pages/BlogEditPage.jsx';
import SingleEditBlog from './Pages/SingleEditBlog.jsx';

function AppRoutesWithLayouts() {
    return (
        <Routes>
            <Route path={AppRoutes.Home} element={<Home />} />
            <Route path={AppRoutes.Login} element={<Login />} />
            <Route path={AppRoutes.Signup} element={<Signup />} />
            <Route path={AppRoutes.BlogCreation} element={<BlogCreation />} />
            <Route path={AppRoutes.SingleBlog} element={<SingleBlog />} />
            <Route path={AppRoutes.EditBlog} element={<EditBlog />} />
            <Route path={AppRoutes.SingleEditBlog} element={<SingleEditBlog />} />
        </Routes>
    );
}

export default AppRoutesWithLayouts;
