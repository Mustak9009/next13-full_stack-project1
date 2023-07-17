'use client'
import axios from 'axios';
import Link from 'next/link';
import { useState,useEffect,useCallback} from 'react';
export default function VerifyEmailPage  () {
    const [token,setToken] = useState<string>('');
    const [verifyed,setVerifyed] = useState<boolean>(false);
    const [error,setError] = useState<boolean>(false);
    const verifyEmail =  useCallback(async () =>{
        try{
            await axios.post('/api/users/verifyemail',{token});
            setVerifyed(true);
        }catch(err:any){
            setError(true);
            console.log(err.response.message);
        }
    },[token]);
    useEffect(()=>{ //Grab token from url
        const urlToken = window.location.search.split('=')[1]; //[1] => provide right side url value after '=' , [0] => left side after '='
        setToken(urlToken || '');
    },[])
    useEffect(()=>{
        if(token.length > 0) verifyEmail();
    },[token,verifyEmail]);
    
    return(
        <div className='min-h-screen flex justify-center items-center py-2 flex-col space-y-4'>
            <h1 className='text-5xl font-bold'>Verify Email</h1>
            <h2 className='bg-orange-600 text-black p-4 rounded-md text-xl '>{token ? token : 'token not found!!🥲'}</h2>
            {verifyed && (
                <div>
                    <h2 className='text-2xl'>Email verifyed</h2>
                    <Link href='/login'>Login</Link>
                </div>
            )}
            {error && (
                <div className='bg-red-500 text-black rounded-md p-4'>
                    <h2>There is something wrong!!😐😐</h2>
                </div>
            )}
        </div>
    )
    
}