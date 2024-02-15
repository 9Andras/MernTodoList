import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Layout from './pages/layout/Layout';
import ErrorPage from "./pages/ErrorPage";
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import {AuthContextProvider} from "./context/AuthContext";
import {TodoContextProvider} from "./context/TodoContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <SignUp/>
            },
            {
                path: "/users/:id/todos",
                element: <Homepage/>
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <TodoContextProvider>
                <RouterProvider router={router}/>
            </TodoContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
