import { useState } from 'react';

import Comment from './Comment';

import send from '../images/send.svg';
import pfp from '../images/pfp.png';

function Post({ image, user, caption, likes }) {
    const numberOfCommentsShownPerClick = 2;
    const [liked, setLiked] = useState();
    const [commentCount, setCommentCount] = useState(0);

    const comments = {
        user1: { date: '2023/04/15', content: 'HELLO I AM YOUR MOM', pfp: pfp },
        user2: {
            date: '2023/05/15',
            content: 'This is the second comment',
            pfp: pfp,
        },
        user3: { date: '2023/06/15', content: 'i hate mohammad', pfp: pfp },
        user4: {
            date: '2023/03/15',
            content: 'reese is my best friend',
            pfp: pfp,
        },
        user5: {
            date: '2023/04/15',
            content: 'INSERT mohammad comment here',
            pfp: pfp,
        },
        user6: { date: '2023/02/15', content: 'canceled', pfp: pfp },
        user7: {
            date: '2023/01/15',
            content: 'this is the last comment ever!',
            pfp: pfp,
        },
    };

    const changeLike = () => {
        if (liked) {
            //remove from database(user's liked posts) incorporate Firebase addData function
        } else {
            //add to database(user's liked posts)
        }

        setLiked((prev) => !prev);
    };

    const changeCommentCount = () => {
        if (commentCount >= Object.keys(comments).length) {
            setCommentCount(0);
        } else {
            setCommentCount((prev) => prev + numberOfCommentsShownPerClick);
        }
    };

    return (
        <div className="flex flex-col w-full gap-3 my-8">
            <div className="flex items-center gap-2">
                <img
                    className="object-cover h-10 rounded-full aspect-square"
                    src={user?.pfp}
                    alt=""
                />
                <h1>{user?.userName}</h1>
            </div>
            <img src={image} alt="" />
            <div className="flex gap-4">
                <svg
                    onClick={changeLike}
                    width="28"
                    height="28"
                    viewBox="0 0 20 18"
                    fill={liked ? '#FD7BAD' : 'none'}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M19 5.25C19 2.765 16.901 0.75 14.312 0.75C12.377 0.75 10.715 1.876 10 3.483C9.285 1.876 7.623 0.75 5.687 0.75C3.1 0.75 1 2.765 1 5.25C1 12.47 10 17.25 10 17.25C10 17.25 19 12.47 19 5.25Z"
                        stroke={liked ? '#FD7BAD' : '#000000'}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <img className="w-7" src={send} alt="" />
            </div>
            <h1>liked by {likes} people</h1>
            <h1 className="text-sm text-gray-400">{caption}</h1>
            <div className="border-b"></div>
        </div>
    );
}

export default Post;
