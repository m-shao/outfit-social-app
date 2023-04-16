import Post from './Post';
import { retrieveData } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from '../firebaseConfig';

function Posts({ tagList }) {
    const [userData, setUserData] = useState();
    const [postData, setPostData] = useState();

    useEffect(() => {
        const postWorkflow = async () => {
            // Handle multiple promises and fetch data for users and posts in parallel
            Promise.all([retrieveData('users'), retrieveData('posts')]).then(
                ([userResults, postResults]) => {
                    setUserData(userResults);
                    setPostData(postResults);
                }
            );
            tagList = Object.keys(tagList);
            if (tagList.length > 0) {
                // Get reference to posts
                const posts = collection(database, 'posts');
                // Create a query against the collection.
                const tagQuery = query(
                    posts,
                    where('tags', 'array-contains-any', tagList)
                );
                const querySnapshot = await getDocs(tagQuery);
                if (querySnapshot.size > 0) {
                    let results = {};
                    querySnapshot.forEach((doc) => {
                        results[doc.id] = doc.data();
                    });
                    setPostData(results);
                }
            }
        };
        postWorkflow();
    }, [setUserData, setPostData, tagList]);

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
