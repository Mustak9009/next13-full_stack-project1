'use client'
import React from 'react'
import {useRouter} from 'next/navigation';
export default function UserProfile({params}:{params:{user:string}}) {
  const router = useRouter();
  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      <div className='flex justify-center items-center'><span className='text-5xl font-bold'>Hi,</span>  <span className='bg-orange-500 p-2 mx-4 text-black text-xl rounded'>{params.user}</span></div>
      <button className='text-white bg-orange-500 px-5 py-1 mt-5 rounded-md' onClick={()=>router.push('/profile')}>Back</button>
    </div>
  )
}
