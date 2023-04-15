import heart from '../images/heart.svg'
import send from '../images/send.svg'

function Post({ image, user, caption, likes}) {
  return (
    <div className="w-full flex flex-col gap-3 my-6">
        <div className='flex items-center gap-2'>
            <img className='rounded-full' src={user.pfp} alt="" />
            <h1>{user.name}</h1>
        </div>
        <img src={image} alt="" />
        <div className='flex gap-4'>
            <img className='w-7' src={heart} alt="" />
            <img className='w-7' src={send} alt="" />
        </div>
        <h1>liked by {likes} people</h1>
        <h1 className='text-gray-400 text-sm'>{caption}</h1>
    </div>
  )
}

export default Post