import {NextResponse} from "next/server";

export const GET = async () =>{
    try{
        const response = NextResponse.json({message:'Log out successful'},{status:200});
        response.cookies.delete('token');
        return response;
    }catch(err:any){
        return NextResponse.json({error:err.message},{status:500});   
    }
}