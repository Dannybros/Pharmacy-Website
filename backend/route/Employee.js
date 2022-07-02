import express from 'express'
import EmployeeCollection from '../model/EmployeeModel.js';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res)=>{
    EmployeeCollection.find({}, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

router.post('/delete', (req,res)=>{
    const {id} = req.body;
    EmployeeCollection.find({_id: id}, (err, data)=>{
        if(err){
            res.status(500).json({error:err});
        }else{
            res.status(201).send({message:"Deleted Successfully"});
            
        }
    }).deleteOne();
})

router.post('/', (req, res)=>{
    const {EmployeeName, Address, Joining_Date, Password, Phone, Salary} = req.body;
    
    if(EmployeeName=="" || Address=="" || Joining_Date=="" || Password=="" || Phone=="" || Salary==""){
        res.status(400).json({
            message:"Please fill in all the fields"
        });
    }

    const employee = new EmployeeCollection({
        EmployeeName:EmployeeName,
        Address:Address,
        Phone:Phone,
        Joining_Date:Joining_Date,
        Salary:parseInt(Salary),
        Password:Password
    })

    employee.save()
    .then(result=>{
        res.status(201).json({
            message:"Employee registered successfully",
            data:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
})
export default router;