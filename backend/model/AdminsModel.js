
import mongoose from 'mongoose'

const adminsSchema = new mongoose.Schema({
    adminName:String,
    adminPassword:String,
    adminID:String
})

const AdminsCollection = mongoose.model('admins', adminsSchema);

export default AdminsCollection;