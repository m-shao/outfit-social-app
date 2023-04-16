import { useAuth0 } from '@auth0/auth0-react';
import { database, validateUser } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';

function AuthCompletion() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [biography, setBiography] = useState('');
    const handleBioChange = (event) => {
        setBiography(event.target.value);
    };

    const setData = async (redirect = false) => {
        await user;
        const userData = {
            bio: biography,
            liked_posts: [],
            password: '',
            pfp: user?.picture,
            posts: [],
            email: user?.email,
            userName: user?.name,
        };
        setDoc(doc(database, 'users', user.name), userData).then(() => {
            if (redirect == true) {
                window.location.pathname = '/';
            }
        });
    };

    useEffect(() => {
        const authflow = async () => {
            await user;
            if (isAuthenticated) {
                validateUser(user.name).then((userExists) => {
                    if (userExists) {
                        redirect('/');
                    }
                });
            } else if (user) {
                setData();
            }
        };

        authflow();
    }, [user, isAuthenticated, validateUser]);

    return (
        <div>
            {isLoading && 'Please wait while your account is loaded.'}
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
