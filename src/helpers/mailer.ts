import { NextResponse } from "next/server"
import {hash} from 'bcryptjs';
import User from "@/models/userModel";
import nodemailer from 'nodemailer';
export const sendEmail = async ({email,emailType,userID}:{email:string,emailType:string,userID:string})=>{
    try{
        //Hash user id 
        const hashedToken = await  hash(userID.toString(),10); 
        //Check email type (what user try to do)
        if(emailType === 'VERIFY_EMAIL'){
            await User.findByIdAndUpdate(userID,{verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 24 * 60 * 60 * 1000 },{new:true,runValidators:true});
        }else if(emailType === 'RESET_PASSWORD'){
            await User.findByIdAndUpdate(userID,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now() + 24 * 60 * 60 * 1000 },{new:true,runValidators:true});
        }
        //Use nodemailer to sent -> email
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_USER,
              pass: process.env.NODEMAILER_PASSWORD
            }
        });
        //There some mail option
        const mailOption = {
            from:process.env.NODEMAILER_MAIL_OPTION_FROM_EMAIL,
            to:email,
            subject:emailType === 'VERIFY_EMAIL' ? 'Verify your email' : 'Reset password',
            html:`<p>Click here <a href="${process.env.DOMAIN}/${emailType === 'VERIFY_EMAIL' ? 'verifyEmail': 'verifyPassword'}?token=${hashedToken}">here<a/> to ${emailType==='VERIFY_EMAIL' ? 'verify your email' : 'reset your password'} 
            </p>`
        }
        //Send email and return mail response
        const mailResponse = await transport.sendMail(mailOption);
        return mailResponse;
    }catch(err:any){
        return NextResponse.json({error:err.message});
    }

}