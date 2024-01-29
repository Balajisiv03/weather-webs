import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import userRoutes from './routes/users.js'


const app=express();
app.use(express.json({limit: "30mb",extended: true}));
app.use(express.urlencoded({limit: "30mb" ,extended: true}));
app.use(cors());
app.use('/user',userRoutes);

app.get("/",(res,res)=>{
    res.send("this is my weather site");
})

const PORT=process.env.PORT || 5000

const URL="mongodb+srv://admin:root@weather-webs.qeinyjr.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology: true})
   .then(()=>app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)}))
   .catch((err)=>console.log(err.message));