import {NextRequest, NextResponse} from 'next/server';
import {getDataFromToken} from '@/helpers/getDataFromToken';
import {connectDB} from '@/db/dbConfig';
import User from '@/models/userModel';

connectDB();
export async  function GET(request:NextRequest){
    try{
        const userId =  getDataFromToken(request);
        const user = await User.findById({_id:userId}).select('-password');
        return NextResponse.json({message:'user found',user},{status:200});
    }catch(err:any){
        return NextResponse.json({error:'Something going wrong!!'},{status:500});
    }
}