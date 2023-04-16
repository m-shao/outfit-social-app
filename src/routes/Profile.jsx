import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { useEffect, useState } from 'react';
import { retrieveData } from '../firebaseConfig';

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userData, setUserData] = useState();
    const [bio, setBio] = useState();

    useEffect(() => {
        retrieveData('users').then(async (results) => {
            setUserData(results);
            await user;
            setBio(results[user.name].bio);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <LoginButton />;
    }

    return (
        <div className="w-full">
            <div className="bg-white">
                {/* Center content and pad */}
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="py-6 md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                                <img
                                    // pfp
                                    className="hidden w-32 h-32 mx-10 rounded-full sm:block"
                                    src={user.picture}
                                    alt="Profile"
                                />
                                <div>
                                    <div className="flex items-center">
                                        <img
                                            className="w-16 h-16 rounded-full sm:hidden"
                                            src={user.picture}
                                            alt="Profile"
                                        />
                                        {/* username */}
                                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                                            {user.name}
                                        </h1>
                                    </div>
                                    {/* email */}
                                    <dl className="flex flex-col mt-6 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                        <dt className="sr-only">Email</dt>
                                        <dd className="flex items-center text-sm font-medium leading-5 text-gray-500 capitalize">
                                            {user.email}
                                        </dd>
                                    </dl>
                                    <dl className="max-w-2xl px-4 py-2 mt-6 bg-gray-200 border-2 border-gray-300 rounded-md">
                                        <dt className="text-lg font-medium">
                                            Biography:
                                        </dt>
                                        <dd className="text-gray-600">{bio}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LogoutButton />
        </div>
    );
};

export default Profile;
