import {NextRequest, NextResponse} from 'next/server';
import User from '@/models/userModel';
import {sendEmail} from '@/helpers/mailer';
export async function  POST (request:NextRequest){
    try{
        const reqBody = await request.json();
        const {email} = reqBody; //get data from client
        const isUserExist = await User.findOne({email}); //Find user by email
        if(!isUserExist){ //is user exist or not
            return new NextResponse(JSON.stringify({ message: 'User not found!!' }),{status: 404,headers: { 'Content-Type': 'application/json' }});
        }
        await sendEmail({email,emailType:'RESET_PASSWORD',userID:isUserExist._id})
        return new NextResponse(JSON.stringify({ message: 'Request processed successfully' }),{status: 200,headers: { 'Content-Type': 'application/json' }});
    }catch(err:any){
        console.log(err);
        return NextResponse.json({error:'Something going wrong'},{status:500});
    }
}