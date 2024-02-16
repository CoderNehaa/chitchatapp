import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';

const SideBarChat = ({name}) => {
    const arr = ["Baby", "Smokey", "Oreo", "Daisy", "Mimi", "Zoe", "Bubba", "Leo", "Bandit", "Rocky", "Simba", "Callie", "Mittens", "Abby", "Cali", "Pepper", "Boo", "Mia", "Patches", "Bella"];
    const [seed, setSeed] = useState(0);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 10))
    }, [])

    return (
        <div className='flex items-center w-full p-4 hover:bg-zinc-800'>
            <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${arr[seed]}&randomizeIds=true`} />
            <div className='ml-4'>
                <span className='text-xl'> {name} </span>
            </div>
        </div>
    )
}

export default SideBarChat
