import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import items from './route/Items.js'
import users from './route/Users.js'
import employee from './route/Employee.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

mongoose.connection.on("connected", ()=>{
    console.log("Mongoose is connected");
})

app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

app.use('/products', items);
app.use('/user', users);
app.use('/employee', employee);

app.get('/', (req, res)=> {
    res.status(200).send("Hello World");
});

app.listen(port, ()=>console.log(`App is starting now in ${port}`));