import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './routes/App';
import Auth from './routes/Auth';
import Navbar from './components/Navbar';
import Feed from './routes/Feed';
import Create from './routes/Create';
import Generate from './routes/Generate';
import Profile from './routes/Profile';
import { Auth0Provider } from '@auth0/auth0-react';
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
    {
        path: '/profile',
        element: (
            <>
                <Navbar />
                <Profile />
            </>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH_DOMAIN}
            clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <RouterProvider router={router} />
        </Auth0Provider>
    </React.StrictMode>
);
