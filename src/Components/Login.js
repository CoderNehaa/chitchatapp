import React, { useEffect } from 'react'
import { UserHook } from './Context/userContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {signInWithGoogle, user} = UserHook();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(user){
      navigate('/');
    }
  }, [user]);
  
  return (
    <div className='bg-zinc-900 h-screen w-screen text-white flex flex-col items-center justify-center'>
      <h1 className='text-2xl tracking-wider m-2'> CHITCHAT </h1>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button" onClick={signInWithGoogle}>
        Sign in with Google
      </button>

    </div>
  )
}

export default Login;
