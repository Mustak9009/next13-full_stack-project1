'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from 'next/navigation';
export default function VerifyPassword() {
  const [password,setPassword] = useState<string>("");
  const [token,setToken] = useState<string>('');
  const router = useRouter();
  const resetPassword = async () => {
    try{
        const res = await axios.post('/api/users/verifyPassword',{password,token});
        if(res.status === 200){
          router.push('/login')
        }
    }catch(err:any){
        console.log(err);
    }
  };
  useEffect(()=>{
    const url_token = window.location.search.split('=')[1];
    setToken(url_token)
  },[]);
  const handle_reset_password = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(token.length > 0) resetPassword();
  }
  return (
    <div className="flex h-screen justify-center items-center w-full">
    <div className="p-8 shadow-md rounded-md w-[30rem]">
      <h2 className="text-2xl font-semibold mb-6">Enter email</h2>
      <form method="POST" onSubmit={handle_reset_password}>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">
            Enter new password
          </label>
          <input type="password" id="password" name="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black" placeholder="Enter new email" onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300">
          Reset password
        </button>
      </form>
    </div>
    </div>
  );
}
