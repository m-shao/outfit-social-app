import { Link } from 'react-router-dom'

import { navIcons } from '../data/constants'
import userIcon from '../images/user.svg'



const Navbar = () => {
    return (
        <>
            <div className="flex flex-col gap-6 justify-between w-full bg-white pt-6 px-6 pb-3 shadow-md ">
                <div className='flex justify-between'>
                    <div className="leading-4 font-extrabold text-lg">
                        <span>Outfit</span>
                        <br />
                        <span className="text-social-blue">Social App</span>
                    </div>
                    <Link to='/Auth'>
                        <img className='w-8' src={userIcon} alt="user account icon" />
                    </Link>
                    
                </div>
                
                <div className="flex-1 text-md">
                    <ul className='flex justify-between'>
                        <li className='flex gap-2'>
                            <img className='w-5' src={navIcons.feed} alt="magnifying glass with circle around it" />
                            <span>Feed</span>
                        </li>
                            <li className='flex gap-2'>
                            <img className='w-5' src={navIcons.create} alt="plus sign with circle around it" />
                        <span>Create</span>
                        </li>
                        <li className='flex gap-2'> 
                            <img className='w-5' src={navIcons.generate} alt="generate/restart symbol" />
                            <span>Generate</span>
                        </li>
                    </ul>
                
                </div>
            </div>
        </>
        
    )
}

export default Navbar