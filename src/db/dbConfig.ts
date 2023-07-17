import mongoose from 'mongoose';
export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('Connected successful with MongoDB ...');
        })
        connection.on('error',(err)=>{
            console.log('MongoDB connection error: ' + err);
            process.exit();
        })

    }catch(err){
        console.log('Something going wrong!!');
        console.log(err);
    }
}