import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

// mongoose.connect(process.env.MONGOOSE_KEY,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
// })

// mongoose.set('useFindAndModify', false);

// mongoose.connection.on("connected", ()=>{
//     console.log("Mongoose is conneted");
// })

app.get('/', (req, res)=> {
    res.status(200).send("Hello World");
});

app.listen(port, ()=>console.log(`app is starting now in ${port}`));