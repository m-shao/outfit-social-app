import { useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { database } from '../firebaseConfig';
import { retrieveData } from '../firebaseConfig';
import { useAuth0 } from '@auth0/auth0-react';

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
        links,
    } = post;

    const [liked, setLiked] = useState();
    const [likedCounter, setLikedCounter] = useState(likeCount); //local counter
    const [commentList, setCommentList] = useState(comments);
    const [commentsDisplay, setCommentsDisplay] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [linksOpen, setLinksOpen] = useState(false);
    const { user, isAuthenticated, isLoading } = useAuth0();

    const affiliateLinks = links;

    const changeLike = async () => {
        const postRef = doc(database, 'posts', id);
        // Don't ask me. This is the most REVERSE logic I've seen
        if (liked === true) {
            setLikedCounter(likedCounter - 1);
            updateDoc(postRef, {
                likeCount: likedCounter,
            });

            setLiked(true);
        } else {
            setLikedCounter(likedCounter + 1);
            updateDoc(postRef, {
                likeCount: likedCounter,
            });
            setLiked(false);
        }

        setLiked((prev) => !prev);
    };

    const displayComments = () => {
        setCommentsDisplay(!commentsDisplay);
        console.log(commentsDisplay);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        const postRef = doc(database, 'posts', id);

        updateDoc(postRef, {
            comments: arrayUnion({
                userName: user.name,
                content: newComment,
                date: Date.now(),
                pfp: user.picture,
            }),
        }).then(() => {
            setNewComment('');
            retrieveData('posts').then((results) => {
                setCommentList(results[id]['comments']);
            });
        });
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
            <div className="border-b"></div>{' '}
            <form onSubmit={onSubmit} className="flex flex-row items-center">
                <input
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add Comment"
                    className="flex-grow p-2 text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
            <div className="text-sm">
                {commentList.length > 0 && (
                    <button className="mt-3" onClick={displayComments}>
                        <h3>
                            {commentsDisplay
                                ? 'Hide comments'
                                : 'View comments...'}
                        </h3>
                    </button>
                )}
                <div className="flex flex-col overflow-y-auto max-h-20">
                    {commentList &&
                        commentsDisplay == true &&
                        commentList
                            .slice(1, -1)
                            .map((comment, index) => (
                                <Comment
                                    key={index}
                                    username={comment.username}
                                    date={comment.date}
                                    content={comment.content}
                                    pfp={comment.pfp}
                                />
                            ))}
                </div>
            </div>
            <div className="border-b"></div>
        </div>
    );
}

export default Post;
