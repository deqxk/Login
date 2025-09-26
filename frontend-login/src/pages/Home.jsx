import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
function Home() {
  const location = useLocation();
  const username = location.state?.username || "";
  return (
    <div className='flex justify-center items-center flex-col h-screen bg-[url(/image3.jpg)] bg-center bg-cover'>
      <h1 className='text-7xl font-bold mb-10 text-amber-500 tracking-wider'>
        {username ? `Welcome ${username}` : "Welcome"}
        </h1>

      {!username && (
        <button className='w-23 p-1 hover:bg-amber-50 rounded-[5px] text-center align-middle outline-1 cursor-pointer'>
          <Link to="/register">Register here</Link>
        </button>
      )}
      
    </div>
  )
}

export default Home
