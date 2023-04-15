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
            <div className='flex flex-col lg:flex-row'>
                <Navbar />
                <App />
            </div>
        ),
    },
    {
        path: '/auth',
        element: (
            <div className='flex flex-col lg:flex-row'>
                <Navbar />
                <Auth />
            </div>
        ),
    },
    {
        path: '/feed',
        element: (
            <div className='flex flex-col lg:flex-row'>
                <Navbar />
                <Feed />
            </div>
        ),
    },
    {
        path: '/create',
        element: (
            <div className='flex flex-col lg:flex-row'>
                <Navbar />
                <Create />
            </div>
        ),
    },
    {
        path: '/generate',
        element: (
            <div className='flex flex-col lg:flex-row'>
                <Navbar />
                <Generate />
            </div>
        ),
    },
    {
        path: '/profile',
        element: (
            <div className='flex flex-col lg:flex-row'>
                <Navbar />
                <Profile />
            </div>
        ),
    },
]);
console.log(import.meta.env.VITE_AUTH_DOMAIN);
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
