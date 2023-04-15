import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <LoginButton />;
    }

    return (
        <div>
            <p>Welcome, {user.name}!</p>
            <p>Your email is: {user.email}</p>
            <img src={user.picture} alt='Profile' />
            <LogoutButton />
        </div>
    );
};

export default Profile;
