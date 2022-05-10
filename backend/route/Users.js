import express from 'express'
import UserCollection from '../model/UserModel.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import * as EmailValidator from 'email-validator';

const router = express.Router();
dotenv.config();

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    try{
        const existingUser = await UserCollection.findOne({username});

        if(!existingUser) return res.send({message: "User doesn't exit"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.json({message: "Password doesn't match."});

        res.json({result:existingUser});

    }catch(error){  
        res.json({message: "Something went wrong"});
    }
})

router.post('/signup', async (req, res)=>{

    const { email, age, username, password, firstName, lastName, cPassword, hint } = req.body;

    const validateEmail = EmailValidator.validate(email);
    
    if(!validateEmail) return res.json({message: "Email is not real"});

    const existingUser = await UserCollection.findOne({email});

    if(existingUser) return res.json({message: "User already exit"});

    if(password !== cPassword){
        return res.json({message: "Password don't match"});
    } 

    const hashPw= await bcrypt.hash(password, 10);

    await UserCollection.create({email, age:19, username, hint, password:hashPw, firstName, lastName});

    res.json("You have logged in successfully");

})

export default router;