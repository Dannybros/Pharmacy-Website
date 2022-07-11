import express from 'express'
import EmployeeCollection from '../model/EmployeeModel.js';

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

router.post('/update', (req,res)=>{
    const {_id, EmployeeName, Gender, BOD, Joining_Date, Password, Phone, Salary} = req.body;

    if(EmployeeName=="" || Gender=="" || BOD=="" || Joining_Date=="" || Password=="" || Phone=="" || Salary==""){
        res.status(400).json({
            message:"Please fill in all the fields"
        });
    }

    EmployeeCollection.findByIdAndUpdate(_id, {
        EmployeeName,
        Phone:Number(Phone),
        Gender,
        BOD,
        Joining_Date,
        Password,
        Salary:Number(Salary),
    }, ({new:true}), (err, data)=>{
        if(err){
            res.status(500).json({message:"Updated Failed. Please Try Again"})
        }else{
            res.status(201).json({data:data, message:"Updated Success"})
        }
    })

})

router.post('/', (req, res)=>{
    const {EmployeeName, Gender, BOD, Joining_Date, Password, Phone, Salary} = req.body;

    if(EmployeeName=="" || Gender=="" || BOD=="" || Joining_Date=="" || Password=="" || Phone=="" || Salary==""){
        res.status(400).json({
            message:"Please fill in all the fields"
        });
    }

    const employee = new EmployeeCollection({
        EmployeeName:EmployeeName,
        Gender:Gender,
        BOD:BOD,
        Phone:parseInt(Phone),
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