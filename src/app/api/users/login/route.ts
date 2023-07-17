import { connectDB } from '@/db/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import bcryptJS from 'bcryptjs';
import jwt from 'jsonwebtoken';
connectDB();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        //check is user exist or not
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User does not exist" }, { status: 400 });
        }
        //Check password
        const verifyPassword = await bcryptJS.compare(password,user.password);
        if(!verifyPassword){
            return NextResponse.json({ message: "Password does't match" }, { status: 400 });
        }
        //Create token
        const tokenData = { //token data
            id:user._id,
            userName:user.userName,
            email:user.email
        }
        const token = jwt.sign(tokenData,process.env.SECRET_KEY!,{
            expiresIn:"5d"
        });
        const response = NextResponse.json({
            message:'Log in successfully',
            success:true,
        },{status:200})
        response.cookies.set('token',token,{
            httpOnly:true
        })
        return response;

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
