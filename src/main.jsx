import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './routes/App';
import Auth from './routes/Auth';
import Navbar from './components/Navbar';
import Feed from './routes/Feed';
import Create from './routes/Create';
import Generate from './routes/Generate';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <Navbar />
                <App />
            </>
        ),
    },
    {
        path: '/auth',
        element: (
            <>
                <Navbar />
                <Auth />
            </>
        ),
    },
    {
        path: '/feed',
        element: (
            <>
                <Navbar />
                <Feed />
            </>
        ),
    },
    {
        path: '/create',
        element: (
            <>
                <Navbar />
                <Create />
            </>
        ),
    },
    {
        path: '/generate',
        element: (
            <>
                <Navbar />
                <Generate />
            </>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
