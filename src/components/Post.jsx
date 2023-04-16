import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../firebaseConfig';
import Comment from './Comment';

import send from '../images/send.svg';

function Post({ post, id }) {
    let {
        caption,
        comments,
        image,
        likeCount, // FIXME: Either renamed likedCounter or likeCounter (in db) to avoid confusion
        pfp,
        tags,
        userName,
        affiliateLinks,
    } = post;
    const numberOfCommentsShownPerClick = 2;
    const [liked, setLiked] = useState();
    const [likedCounter, setLikedCounter] = useState(likeCount); //local counter
    const [commentCount, setCommentCount] = useState(0);
    const [linksOpen, setLinksOpen] = useState(false);

    /*     const comments = {
        user1: { date: '2023/04/15', content: 'HELLO I AM YOUR MOM', pfp: pfp },
    }; */
    console.log(likedCounter);
    const changeLike = async () => {
        const postRef = doc(database, 'posts', id);

        if (liked) {
            setLikedCounter(likedCounter + 1);
            console.log(likedCounter);
            updateDoc(postRef, {
                likeCount: likedCounter,
            });
        } else {
            setLikedCounter(likedCounter - 1);
            updateDoc(postRef, {
                likeCount: likedCounter,
            });
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
                    src={pfp}
                    alt=""
                />
                <h1>{userName}</h1>
            </div>

            <div className="relative w-full">
                <img className="w-full rounded-lg" src={image} alt="" />
                {/* Display affiliate links CONTAINER, only if they exist, then display liks themselves when click*/}
                {affiliateLinks && (
                    <>
                        <div
                            onClick={() => {
                                setLinksOpen((prev) => !prev);
                            }}
                            className="absolute z-10 w-4 h-4 bg-white rounded-full opacity-75 bottom-2 right-2"
                        ></div>
                        {linksOpen && (
                            <div className="absolute flex flex-col gap-3 p-2 text-xs bg-white bottom-6 right-6 opacity-95 rounded-xl">
                                {affiliateLinks.map((entry, index) => (
                                    <div key={index} className="flex gap-2">
                                        <h3>{entry.clothingType}:</h3>
                                        <a
                                            target="_blank"
                                            className="flex-1 text-social-blue"
                                            href={entry.link}
                                        >
                                            {entry.link}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

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
            <h1>liked by {likedCounter} people</h1>
            <h1 className="text-sm text-gray-400">{caption}</h1>
            <div className="text-sm">
                <div className={'flex flex-col'}>
                    {Object.keys(comments)
                        .slice(0, commentCount)
                        .map((user, index) => (
                            <Comment
                                key={index}
                                username={user}
                                date={comments[user].date}
                                content={comments[user].content}
                                pfp={comments[user].pfp}
                            />
                        ))}
                </div>
                <button className="mt-3" onClick={changeCommentCount}>
                    <h3>
                        {commentCount >= Object.keys(comments).length
                            ? 'Hide all comments'
                            : 'View more comments...'}
                    </h3>
                </button>
            </div>
            <div className="border-b"></div>
        </div>
    );
}

export default Post;
