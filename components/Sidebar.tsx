import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import useAuthStore from '../store/authStore';
const Sidebar: NextPage = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);
  const { pathname } = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuthStore();

  const activeLink = 'p-0 flex items-center gap-3  justify-center lg:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

  const normalLink = 'p-0 flex items-center gap-3  justify-center lg:justify-start cursor-pointer font-semibold rounded';

  return (
    <div>
      <div
        className='block lg:hidden m-2 ml-4 mt-3 text-xl'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className='lg:w-[350px] w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 lg:border-0 p-3 '>
          <div className='lg:border-b-2 border-gray-200 lg:pb-4 '>
            <Link href='/'>
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className='text-2xl'>
                  <AiFillHome />
                </p>
                <span className='capitalize text-xl hidden lg:block p-0'>
                  For You
                </span>
              </div>
            </Link>
          </div>
          
          <Discover />
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
