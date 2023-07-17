import {NextRequest} from 'next/server';
import jwt from 'jsonwebtoken';
interface decodeTokenType  {
    id:string,
    userName:string,
    email:string
}
export const getDataFromToken = (request:NextRequest)=>{
    try{
        const token = request.cookies.get('token')?.value || '';
        const decodeToken:decodeTokenType = jwt.verify(token,process.env.SECRET_KEY!) as decodeTokenType;
        return decodeToken.id;
    }catch(err:any){
        throw new Error(err.message)
    }

}