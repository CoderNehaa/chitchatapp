import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import React, { useEffect, useRef, useState } from 'react';
import { UserHook } from '../Context/userContext';

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import chitChatImage from '../assets/Chit-Chat.jpg';

const ChatWindow = ({setShowMobileDesc, showMobileDesc}) => {
  const { getMessages, messages, user, addMessageToDb } = UserHook();
  const [showEmojiBoard, setShowEmojiBoard] = useState(false);
  const [text, setText] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    getMessages();
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

  }, [])
  
  function sendMessage(e){
    e.preventDefault();
    addMessageToDb(text);
    setText("");
  }

  function addEmoji(e){
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setText(text + emoji);
  }
  
  return (
    <div className='relative w-full lg:w-3/4 h-full bg-zinc-900 text-white'>  
      {/* header */}
      <div className='border-b-2 border-zinc-500 px-10 py-4 flex items-center' onClick={() => setShowMobileDesc(!showMobileDesc)}>
        
        <img className='h-16 w-16 rounded-full' src={chitChatImage} alt="Chit Chat" />

        <div className='ml-4'>
          <h3 className='text-2xl'> Chitchat Group </h3>
        </div>
      </div>
      
      {/* Chat window body */}
      <div ref={chatContainerRef} className='p-10 h-[80vh] overflow-y-auto'>
        {messages && messages.map((message) => 
        <div className={`my-4 flex flex-col ${message.email === user.email?'items-end':'items-start'}`} key={message.id}>
            <span className='text-xs px-1'> {message.name} </span>
            <span className={`${message.email === user.email?'bg-fuchsia-700':'bg-zinc-700'}  px-2 py-1 rounded-lg`}> 
              <span className='text-lg mr-2'> {message.msg} </span>
              <span className='text-xs relative -bottom-1'> {message.time} </span>
            </span>
          </div>
        )}
      </div>

      {/* footer */}
      <div className='absolute w-full bottom-2'>
        {showEmojiBoard && <div className='overflow-hidden'>
            <Picker data={data} perLine={10} navPosition={'bottom'} maxFrequentRows={'4'} previewPosition={'none'} onEmojiSelect={addEmoji} />
        </div>}
        <div className='px-4 py-2 lg:py-4 flex justify-between bg-zinc-800'>
          <EmojiEmotionsIcon onClick={() => setShowEmojiBoard(!showEmojiBoard)} className='hover:cursor-pointer' />
          <form className='relative w-full flex justify-between' onSubmit={sendMessage}>
            <input type='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Send a message' 
              className='bg-transparent w-full mx-2 px-2 focus:outline-none' />
            <button type='submit'> Send </button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default ChatWindow;
