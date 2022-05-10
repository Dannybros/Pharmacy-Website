import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    age:Number,
    username:String,
    password:String,
    hint:String
})

const UserCollection = mongoose.model('users', userSchema);

export default UserCollection;