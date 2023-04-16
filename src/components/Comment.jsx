import React from 'react';

function Comment({ pfp, username, date, content }) {
    return (
        <div className="flex flex-row gap-2 mt-3">
            <div className="flex gap-1">
                <img
                    className="object-cover w-5 rounded-full aspect-square"
                    src={pfp}
                    alt=""
                />
                <p>{username}</p>
            </div>
            <div>
                <p className="text-xs">&emsp;{content}</p>
            </div>
            <div className="border-b"></div>
        </div>
    );
}

export default Comment;
