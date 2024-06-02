import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()
  return (
    
      <div onMouseEnter={()=>{
          navigate("/signin")
        }} className='flex justify-center items-center dark:bg-slate-600 dark:text-zinc-200 text-[8.5rem] h-screen '>Home Page</div> 
    
  )
}

export default HomePage
