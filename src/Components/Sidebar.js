import React, { useEffect } from 'react';
import SideBarChat from './SideBarChat';
import { UserHook } from './Context/userContext';

const Sidebar = ({showMobileDesc, setShowMobileDesc}) => {
  const { logOut, user, getMembers, members } = UserHook();

  useEffect(() => {
      getMembers();
  }, []);

  return (
    <div className={`absolute z-10 bg-zinc-700 text-white ${showMobileDesc?'w-screen':'sm:hidden lg:block'} lg:h-screen lg:w-1/4`}>
      <div className='flex justify-between items-center p-3 py-6 md:p-6 bg-zinc-800'>
        <div className='flex flex-col'>
          <span className='text-lg'> {user && user.name} </span>
          <span className='text-sm'> {user && user.email} </span>
        </div>
        <div className='relative right-0 text-2xl'>
          <button onClick={logOut}><i className="fa-solid fa-arrow-right-from-bracket mr-5"></i></button>
          <button onClick={() => setShowMobileDesc(!showMobileDesc)}><i className='fa-solid fa-xmark lg:hidden'></i> </button>
        </div>
      </div>

      <div className='bg-zinc-500 p-2 text-2xl'>
        Group Members
      </div>

      <div>
        {members && members.map((member) => 
          <SideBarChat name={member.name} key={member.id} />
        )}
      </div>      
    </div>
  )
}

export default Sidebar;