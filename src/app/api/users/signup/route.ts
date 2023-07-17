import {connectDB} from '@/db/dbConfig';
import {NextRequest,NextResponse} from 'next/server';
import User from '@/models/userModel';
import bcryptJS from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connectDB();
export async function POST(request:NextRequest){
    try{
        const resBody = await request.json();
        const {userName,email,password} = resBody;

        //Check user exist or not
        const isUserExist = await User.findOne({email});
        if(isUserExist){
            return NextResponse.json({error:"User already exist"},{status:400});
        }
        //Hashing password
        const salt = await bcryptJS.genSalt(10);
        const passwordHash = await bcryptJS.hash(password,salt);
        
        //Create a new user 
        const newUser = new User({
            userName,
            email,
            password:passwordHash
        });
        const saveUser =  await newUser.save();

        //Verify email
        await sendEmail({email,emailType:'VERIFY_EMAIL',userID:saveUser._id});

        return NextResponse.json({message:"user crease successfully",success:true,saveUser});
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500})
    }
}
