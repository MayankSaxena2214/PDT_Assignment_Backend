import mongoose from "mongoose"

export const dbConnection=async()=>{
    await mongoose.connect(process.env.MONGO_URI,{
        dbName:"PDT_GAME"
    })
    .then(()=>{
        console.log("Mongodb Connected");
    })
    .catch((err)=>{
        console.log(`Error occured ${err}`);
    })
}