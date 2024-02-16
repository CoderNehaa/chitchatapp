import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

const Home = () => {
  const [showMobileDesc, setShowMobileDesc] = useState(false);

  return (
    <div className='min-h-screen h-full absolute lg:flex'>
      <Sidebar showMobileDesc={showMobileDesc} setShowMobileDesc={setShowMobileDesc} />
      <ChatWindow setShowMobileDesc={setShowMobileDesc} showMobileDesc={showMobileDesc} />
    </div>
  )
}

export default Home;
