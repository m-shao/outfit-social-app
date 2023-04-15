import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './routes/App';
import Auth from './routes/Auth';
import Navbar from './components/Navbar';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import Profile from './routes/Profile';

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
            domain={process.env.REACT_APP_AUTH_DOMAIN}
            clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <RouterProvider router={router} />
        </Auth0Provider>
    </React.StrictMode>
);
