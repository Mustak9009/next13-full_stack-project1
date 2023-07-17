"use client";
import React from "react";
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from 'next/navigation';

export default function Register() {
  const [disableButton,setDisableButton] = React.useState<Boolean>(false);
  const router = useRouter();
  const [user, setUser] = React.useState<UserType>({
    userName: "",
    email: "",
    password: "",
  });
  React.useEffect(()=>{
    if(user.userName){
      if(user.userName.length > 0 && user.password.length > 0 && user.email.length > 0){
        setDisableButton(true);
      }else setDisableButton(false);
    }

  },[user])
  const handleSubmit =async (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      try{
        const response = await axios.post('/api/users/signup',user);
        console.log(response.data);
        router.push('/login');
      }catch(err){
        console.log(err);
      }
  }
  return (
    <div className="flex h-screen justify-center items-center">
    <div className="p-8 shadow-md rounded-md w-[30rem]">
      <h2 className="text-2xl font-semibold mb-6">{!disableButton ? "Not ready for register" : "Ready for Register"}</h2>
      <form onSubmit={handleSubmit} method="POST">
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <input type="text" id="username" name="username" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" placeholder="user name" onChange={e=>setUser({...user,userName:e.target.value})} required/>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"  placeholder="email" onChange={e=>setUser({...user,email:e.target.value})} required/>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input type="password" id="password" name="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" placeholder="password" onChange={e=>setUser({...user,password:e.target.value})} required/>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300">
          Register
        </button>
        <br/>
        <br/>
        <Link href={'/login'} className="text-blue-600 underline">Already have account? login</Link>
      </form>
    </div>
    </div>

  );
}

