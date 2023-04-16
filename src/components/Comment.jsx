import React from 'react'

function Comment({pfp, username, date, content}) {
  return (
    <div className='flex flex-col mt-3 gap-2'>
        <div className='flex gap-1'>
            <img className='rounded-full w-5 aspect-square object-cover' src={pfp} alt="" />
            <p>{username}</p>
        </div>
        <div>
            <p className='text-xs'>&emsp;{content}</p>
        </div>
        <div className='border-b'></div>
    </div>
  )
}

export default Comment