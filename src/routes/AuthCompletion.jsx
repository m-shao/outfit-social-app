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
        <div>
            {isLoading && 'Your account is loading!'}
            {isAuthenticated && (
                <>
                    'Set up your account:' Profile Bio:
                    <input
                        type="text"
                        value={biography}
                        onChange={handleBioChange}
                    />
                    <button
                        onClick={() => {
                            setData(true);
                        }}
                    >
                        Continue
                    </button>
                </>
            )}
        </div>
    );
}

export default AuthCompletion;
