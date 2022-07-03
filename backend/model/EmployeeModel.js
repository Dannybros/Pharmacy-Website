import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    EmployeeName:String,
    Address:String,
    Phone:Number,
    Joining_Date:String,
    Salary:Number,
    Password:String
})

const EmployeeCollection = mongoose.model('employee', employeeSchema);

export default EmployeeCollection;