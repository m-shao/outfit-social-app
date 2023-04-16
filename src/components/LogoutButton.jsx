import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
            }
        >
            Log Out
        </button>
    );
};

export default LogoutButton;
