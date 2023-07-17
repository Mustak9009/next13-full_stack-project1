'use client'
import axios from "axios";
import React, { useEffect } from "react";
import {useRouter} from 'next/navigation';
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const [userName,setUserName] = React.useState<string>('');
  const logout = async()=>{
    try{
       await axios.get('/api/users/logout');
       router.push('/login');
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    const getUserData  = async ()=>{
      const res = await axios('/api/users/me');
      setUserName(res.data.user.userName);
    }
    getUserData();
  },[]);
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="mb-5 text-4xl font-bold capitalize">
        <Link href={`/profile/${userName}`}>{userName}</Link>
      </h1>
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
