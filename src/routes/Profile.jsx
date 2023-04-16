import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { useEffect, useState } from 'react';
import { retrieveData } from '../firebaseConfig';

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userData, setUserData] = useState();

    useEffect(() => {
        retrieveData('users').then((results) => {
            setUserData(results);
            console.log(results['Reese Chong']);
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
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6 md:flex md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                                <img
                                    // pfp
                                    className="mx-10 hidden h-32 w-32 rounded-full sm:block"
                                    src={user.picture}
                                    alt="Profile"
                                />
                                <div>
                                    <div className="flex items-center">
                                        <img
                                            className="h-16 w-16 rounded-full sm:hidden"
                                            src={user.picture}
                                            alt="Profile"
                                        />
                                        {/* username */}
                                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                                            {user.name}
                                        </h1>
                                    </div>
                                    {/* email */}
                                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                                        <dt className="sr-only">Email</dt>
                                        <dd className="flex items-center text-sm leading-5 text-gray-500 font-medium capitalize">
                                            {user.email}
                                        </dd>
                                    </dl>
                                    <dl className="bg-gray-200 border-2 border-gray-300 rounded-md px-4 py-2 mt-6 max-w-2xl">
                                        <dt className="text-lg font-medium">
                                            Biography:
                                        </dt>
                                        <dd className="text-gray-600">
                                            {userData['Reese Chong'].bio}
                                        </dd>
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
