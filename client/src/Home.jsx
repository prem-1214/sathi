import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function Home() {
  return (
    <>
        <div className='flex flex-col items-center h-screen gap-y-10'>
            <p className='text-5xl p-4'>Welcome to the AI Agent</p>
            <p className='text-xl'>This is a simple AI agent that can answer your questions.</p>
            <Link to="/askAI" 
              className='text-blue-600 text-2xl'
            >
            Chat With Sathi
            </Link>
        </div>
    </>
  )
}

export default Home