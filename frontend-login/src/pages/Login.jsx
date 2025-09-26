import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const GETURL = "http://localhost:4000/api/user"
  const usernameInput = (event) =>{
    return setUsername(event.target.value.toLowerCase());
  }
  const passwordInput = (event) =>{
    return setPassword(event.target.value);
  }
  function onLogin () {
            const getData = async () => {
              if (!username) {
                      toast.error("Please enter a username");
                      return;
                    }
                    if (!password) {
                      toast.error("Please enter a password");
                      return;
                      }
              try {
                  const response = await fetch(GETURL);
                  const data = await response.json();
                  setUser(data); // save data in state
                  console.log(data);
                  data.map(index=>{
                    if(index.username=== username && index.password === password){
                      toast.success("Login successful!");
                    navigate("/",{ state: { username } })
                    }else toast.error("Your Account Does Not Exist");
                  })

                } catch (error) {
                  console.error(error);
                }
          }
          getData();
          
  }
  
  return (
    <div className='w-full h-screen flex justify-center items-center bg-[url(/image2.jpg)] bg-cover bg-center'>
      <div className='w-md bg-amber-50/30  py-10 px-3 rounded-4xl  flex flex-col gap-5'>
        <div className='flex justify-center items-center flex-col'>
        <h1 className='text-black text-6xl'>Welcoome Back</h1>
        <h3 className='text-3xl text-blue-500'>Login</h3>
        </div>
        <div className='flex items-center flex-col gap-5'>

          <input type="text" placeholder='Username' 
          className='w-[80%] outline-none h-10 text-[16px] border-1 border-black p-5 rounded-md' 
          onChange={usernameInput} value={username}/>

          <input type="password" placeholder='Password' 
          className='w-[80%] outline-none h-10 text-[16px] border-1 border-black p-5 rounded-md'
          onChange={passwordInput} value={password}/>
          
          <button className='bg-blue-500
           text-white hover:bg-white hover:text-black 
           cursor-pointer h-10 w-30 text-[20px] mt-[5px] border-1
            border-black rounded-md text-center' onClick={onLogin}>Login</button>

        </div>
        <div className='h-1/2 flex justify-evenly'>
            <div><a>forget password</a></div>
            <p>Create your Acount? <Link to="/register">Register</Link></p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    
  )
}

export default Login