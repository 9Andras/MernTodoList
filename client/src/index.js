import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Layout from './pages/layout/Layout';
import ErrorPage from "./pages/ErrorPage";
import UserLogin from './components/user/UserLogin';
import UserSignUp from "./components/user/UserSignUp";
import TodoList from "./components/Todos/TodoList";
import {AuthContextProvider} from "./context/AuthContext";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/login",
                element: <UserLogin/>
            },
            {
                path: "/register",
                element: <UserSignUp/>
            },
            {
                path: "/users/:id/todos",
                element: <TodoList/>
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router}/>
        </AuthContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
