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

router.post('/', (req, res)=>{
    const {name, email, address, joining_date, password, phone, salary} = req.body;
    
    if(name=="" || email=="" || address=="" || joining_date=="" || password=="" || phone=="" || salary==""){
        res.status(400).json({
            message:"Please fill in all the fields"
        });
    }

    const employee = new EmployeeCollection({
        EmployeeName:name,
        email:email,
        Address:address,
        Phone:phone,
        Joining_Date:joining_date,
        Salary:parseInt(salary),
        password:password
    })

    employee.save()
    .then(result=>{
        res.status(201).json({
            message:"Employee registered successfully",
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
})
export default router;