import {NextRequest, NextResponse} from 'next/server';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
export const POST = async(req:NextRequest)=>{
    try{
        const reqBody = await req.json();
        const {token,password} = reqBody;
        const salt = await bcryptjs.genSalt(10);
        const new_hash_password = await bcryptjs.hash(password,salt);
        //Find user by token and update password
        const user = await User.findOneAndUpdate({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}},{password:new_hash_password})
        if(!user){
            return NextResponse.json({message:'User not found'},{status:404});
        }

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message:"Password reset successful😉"},{status:200});

    }catch(err:any){
        return NextResponse.json({error:'Something going wrong🙁!!'},{status:500});
    }
}