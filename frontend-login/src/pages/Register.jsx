import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  let [username, setUsername] = useState('');
  username = username.toLowerCase();
    function Changeuser(event){
      setUsername(event.target.value);
    }

  let [password, setpassword] = useState('');
  password = password.toLowerCase();
    function Changepass(event){
      setpassword(event.target.value);
    }


    async function Fetchdata(){
          if (!username) {
            toast.error("Please enter a username");
            return;
          }
          if (!password) {
            toast.error("Please enter a password");
            return;
          }

          try {
            const response = await fetch('https://login-backend-nine.vercel.app/api/register', {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
              toast.error(data.message || "Something went wrong");
              return;
            }

            toast.success(data.message || "Account Created Successfully!");
          } catch (error) {
            toast.error(`Error: ${error.message || error}`);
          }
}

  
  return (
    <div className='w-full h-screen flex justify-center items-center bg-[url(/image1.jpg)] bg-cover bg-center'>
      <div className='w-[400px] bg-amber-50/30  py-10 px-3 rounded-3xl  flex flex-col gap-5'>
        <div className='flex justify-center items-center flex-col'>
        <h1 className='text-black text-6xl'>Welcoome</h1>
        <h3 className='text-3xl text-blue-500'>Sign Up</h3>
        </div>
        <div className='flex items-center flex-col gap-5'>
          <input type="text" placeholder='Username' value={username} onChange={Changeuser} className='w-[80%] outline-none h-10 text-[16px] border-1 border-black p-5 rounded-md'/>
          <input type="password" placeholder='Password' value={password} onChange={Changepass} className='w-[80%] outline-none h-10 text-[16px] border-1 border-black p-5 rounded-md'/>
          
          <button onClick={(e) => {
              e.preventDefault(); // Prevent page refresh
              Fetchdata();
            }} className='bg-blue-500 text-white hover:bg-white hover:text-black cursor-pointer h-10 w-30 text-[20px] mt-[5px] border-1 border-black rounded-md text-center'>Sign</button>
        </div>
        <div className='h-1/2 flex justify-evenly'>
            
            <p>Already have a  Acount? <Link to="/login">login</Link></p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000}/>
    </div>
  )
}

export default Register
