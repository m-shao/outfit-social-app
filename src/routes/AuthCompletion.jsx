import { useAuth0 } from '@auth0/auth0-react';
import { database, validateUser } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
function AuthCompletion() {
    const [biography, setBiography] = useState('');
    const handleBioChange = (event) => {
        setBiography(event.target.value);
    };
    const { user, isAuthenticated, isLoading } = useAuth0();
    const setData = (redirect = false) => {
        const userData = {
            bio: biography,
            liked_posts: [],
            password: '',
            pfp: user.picture,
            posts: [],
            email: user.email,
            userName: user.name,
        };
        setDoc(doc(database, 'users', user.name), userData).then(() => {
            if (redirect == true) {
                window.location.pathname = '/';
            }
        });
    };

    if (isAuthenticated) {
        validateUser(user.name).then((userExists) => {
            if (userExists == true) {
                window.location.pathname = '/';
            }
        });
    }
    setData();
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
