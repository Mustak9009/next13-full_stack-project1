"use client";
import React from "react";
import Link from 'next/link';
import axios from 'axios';
import {useRouter} from 'next/navigation';
export default function Signup() {
  const [loading,setLoading] = React.useState<Boolean>(false);
  const router = useRouter();
  const [user, setUser] = React.useState<UserType>({
    email: "",
    password: "",
  });
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      setLoading(true);
      try{
         const response = await axios.post('/api/users/login',user);
         router.push('/profile')
         console.log("Log in successfull: ",response.data);
      }catch(err:any){
        console.log("Log in failed: ",err.message);
        console.log(err);
      }finally{
        setLoading(false);
      }
  }
  return (
    <div className="flex h-screen justify-center items-center">
    <div className="p-8 shadow-md rounded-md w-[30rem]">
      <h2 className="text-2xl font-semibold mb-6">{loading ? "Loading ..." : "Log in"}</h2>
      <form onSubmit={handleSubmit} method="POST">
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
          Log In
        </button>
        <br/>
        <br/>
        <Link href={'/register'} className="text-blue-600 underline">Create an account? login</Link>
        <br/>
        <Link href={'/reset-password'} className="text-blue-600 underline">For got passowrd?</Link>

      </form>
    </div>
    </div>

  );
}
