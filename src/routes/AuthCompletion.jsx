import { useAuth0 } from '@auth0/auth0-react';
import { database, validateUser } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

function AuthCompletion() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    // State for controlled bio textfield
    const [biography, setBiography] = useState('');
    const handleBioChange = (event) => {
        setBiography(event.target.value);
    };

    // Set user data on cloud (only occurs if user doesn't exist)
    const setData = async (redirect = false) => {
        await user;
        // User Data Format in Firebase
        const userData = {
            bio: biography,
            liked_posts: [],
            password: '',
            pfp: user?.picture,
            posts: [],
            email: user?.email,
            userName: user?.name,
        };
        // Create a document in the collection with user
        setDoc(doc(database, 'users', user.name), userData).then(() => {
            // Redirect to home based on parameters
            if (redirect == true) {
                navigate('/');
            }
        });
    };

    useEffect(() => {
        const authflow = async () => {
            // If user exists, navigate to home
            // else sync data and wait for bio
            await user;
            if (isLoading) {
                return;
            }
            const userExists = await validateUser(user.name);

            if (userExists) {
                navigate('/');
            } else if (user) {
                setData();
            }
            // Null is returned for navigate("/") to work (resp. obj required)
            return null;
        };
        authflow();
    }, [user, isAuthenticated, validateUser]);

    return (
        <div className="p-4">
            {isLoading && (
                <p className="text-center">Your account is loading!</p>
            )}
            {isAuthenticated && (
                <div className="flex flex-col space-y-4">
                    <p>Set up your account:</p>
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Profile Bio:
                        </label>
                        <input
                            type="text"
                            className="block w-full h-24 px-4 text-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            value={biography}
                            onChange={handleBioChange}
                        />
                    </div>
                    <button
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                            setData(true);
                        }}
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
}

export default AuthCompletion;
