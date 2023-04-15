import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';

import { navIcons } from '../data/constants';
import userIcon from '../images/user.svg';
import Location from './Location';

const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <>
      <div className="flex flex-col justify-between w-full gap-6 px-6 pt-6 pb-3 bg-white shadow-md ">
        <div className="flex justify-between">
          <div className="text-lg font-extrabold leading-4">
            <span>Outfit</span>
            <br />
            <span className="text-social-blue">Social App</span>
          </div>
          {isAuthenticated ? (
                  <Link to='/profile'>
                      <img
                          className='w-8 rounded-full'
                          src={user.picture}
                          alt='user account icon'
                      />
                  </Link>
              ) : (
                  <LoginButton />
              )}
        </div>
        
        <div className="flex-1 text-md">
          <ul className="flex justify-between">
            <li className="flex gap-2">
              <img
                className="w-5"
                src={navIcons.feed}
                alt="magnifying glass with circle around it"
              />
              <span>Feed</span>
            </li>
            <li className="flex gap-2">
              <img
                className="w-5"
                src={navIcons.create}
                alt="plus sign with circle around it"
              />
              <span>Create</span>
            </li>
            <li className="flex gap-2">
              <img
                className="w-5"
                src={navIcons.generate}
                alt="generate/restart symbol"
              />
              <span>Generate</span>
            </li>
          </ul>
        </div>
      </div>
      <Location />
    </>
  );
};

export default Navbar;
