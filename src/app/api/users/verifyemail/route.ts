import {NextRequest,NextResponse} from 'next/server';
import User from '@/models/userModel';
export async function POST(request:NextRequest){
    try{
        //Get token from user ...(front end)
        const reqBody = await request.json();
        const {token}  = reqBody;

        //Find user by token and a condition -> verifyTokenExpiry:{$gt:Date.now()}}
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}});
        //If user not found according -> token
        if(!user){
            return NextResponse.json({message:'User not found'},{status:404});
        }
        console.log(user);
        
        //Add changes to data base if all right 
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        
        await user.save();
        return NextResponse.json({message:'Verify email successful',success:true },{status:200});
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500});
    }
}