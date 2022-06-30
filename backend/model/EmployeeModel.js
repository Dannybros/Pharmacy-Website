import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    EmployeeName:String,
    Address:String,
    Phone:String,
    Joining_Date:String,
    Salary:Number,
    password:String
})

const EmployeeCollection = mongoose.model('employee', employeeSchema);

export default EmployeeCollection;