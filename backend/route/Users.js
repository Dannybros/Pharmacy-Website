import express from 'express'
import UserCollection from '../model/UserModel.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import * as EmailValidator from 'email-validator';

const router = express.Router();
dotenv.config();

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    if( username=='' || password==''){
        return res.status(400).json({message: "Please fil in all the fields"});
    }

    try{
        const existingUser = await UserCollection.findOne({username});

        if(!existingUser) return res.status(400).json({message: "User doesn't exit"});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Password doesn't match."});

        res.status(200).json({result:existingUser});

    }catch(error){  
        res.status(401).json({message: "Something went wrong. Please Check Internet"});
    }
})

router.post('/signup', async (req, res)=>{

    const { email, age, username, password, firstName, lastName, cPassword, hint } = req.body;

    if(email=='' || age=='' || username=='' || password=='' || firstName=='' || lastName=='' || cPassword=='' || hint==''){
        return res.status(400).json({message: "Please fil in all the fields"});
    }

    const validateEmail = EmailValidator.validate(email);
    
    if(!validateEmail) return res.status(400).json({message: "Email is not real"});

    const existingUser = await UserCollection.findOne({email});

    if(existingUser) return res.status(400).json({message: "User already exit"});

    if(password !== cPassword){
        return res.json({message: "Password don't match"});
    } 

    const hashPw= await bcrypt.hash(password, 10);

    await UserCollection.create({email, age:Number(age), username, hint, password:hashPw, firstName, lastName});

    res.status(201).json({message:"You have sign up successfully"});

})

export default router;