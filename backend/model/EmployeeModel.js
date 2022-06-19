import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    EmployeeID:mongoose.ObjectId,
    EmployeeName:String,
    Address:String,
    Phone:Number,
    Joining_Date:String,
    Salary:Number,
    password:String
})

const EmployeeCollection = mongoose.model('employee', employeeSchema);

export default EmployeeCollection;