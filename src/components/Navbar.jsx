import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';

import { navIcons } from '../data/constants';
import userIcon from '../images/user.svg';

const Navbar = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [activeNav, setActiveNav] = useState('feed');
    console.log(isAuthenticated);
    return (
        <>
            <div className="bg-black lg:w-1/4 lg:max-w-sm lg:h-screen"></div>
            <div className="flex flex-col justify-between w-full bg-white shadow-md lg:w-1/4 lg:max-w-sm lg:h-screen lg:fixed">
                <div className="flex justify-between mx-6 mt-6 mb-4">
                    <div className="text-lg font-extrabold leading-5">
                        <span>Outfit</span>
                        <br />
                        <span className="text-social-blue">Social App</span>
                    </div>
                    {isAuthenticated ? (
                        <Link to="/profile">
                            <img
                                className="w-8 rounded-full"
                                src={user.picture}
                                alt="user account icon"
                            />
                        </Link>
                    ) : (
                        <LoginButton />
                    )}
                </div>

                <div className="flex-1 text-md ">
                    <ul className="flex lg:flex-col lg:items-start ">
                        <Link
                            to="/"
                            onClick={() => {
                                setActiveNav('feed');
                            }}
                            className={
                                'flex justify-center lg:justify-start lg:w-full lg:p-4 p-2 gap-2 flex-1 rounded-tr-lg ' +
                                (activeNav == 'feed' && 'bg-gray-200')
                            }
                        >
                            <img
                                className="w-5"
                                src={navIcons.feed}
                                alt="magnifying glass with circle around it"
                            />
                            <span>Feed</span>
                        </Link>
                        <Link
                            to="/create"
                            onClick={() => {
                                setActiveNav('create');
                            }}
                            className={
                                'flex justify-center lg:justify-start lg:w-full lg:p-4 p-2 gap-2 flex-1 rounded-t-lg ' +
                                (activeNav == 'create' && 'bg-gray-200')
                            }
                        >
                            <img
                                className="w-5"
                                src={navIcons.create}
                                alt="plus sign with circle around it"
                            />
                            <span>Create</span>
                        </Link>
                        <Link
                            to="/generate"
                            onClick={() => {
                                setActiveNav('generate');
                            }}
                            className={
                                'flex justify-center lg:justify-start lg:w-full lg:p-4 p-2 gap-2 flex-1 rounded-tl-lg ' +
                                (activeNav == 'generate' && 'bg-gray-200')
                            }
                        >
                            <img
                                className="w-5"
                                src={navIcons.generate}
                                alt="generate/restart symbol"
                            />
                            <span>Generate</span>
                        </Link>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
