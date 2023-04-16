import Post from './Post';
import { retrieveData } from '../firebaseConfig';
import pfp from '../images/pfp.png';
import woman from '../images/woman.png';

import man from '../images/man.png';
import pfp2 from '../images/pfp2.png';
import { useEffect, useState } from 'react';

function Posts() {
    const [userData, setUserData] = useState();
    const [postData, setPostData] = useState();

    useEffect(() => {
        // Handle multiple promises and fetch data for users and posts in parallel
        Promise.all([retrieveData('users'), retrieveData('posts')]).then(
            ([userResults, postResults]) => {
                setUserData(userResults);
                setPostData(postResults);
            }
        );
    }, []);

    // Right now avatar, userName, and other parts of Post Components are broken
    // This is due to a database bug that will be fixed once Auth0 is integrated with Firebase
    return (
        <div>
            {userData &&
                Object.keys(postData).map((key) => {
                    const post = postData[key];
                    return <Post key={key} post={post} id={key} />;
                })}
        </div>
    );
}

export default Posts;
