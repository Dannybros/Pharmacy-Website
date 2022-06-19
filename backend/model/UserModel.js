import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userID:mongoose.ObjectId,
    firstName:String,
    lastName:String,
    email:String,
    birthday:String,
    username:String,
    password:String,
    hint:String
})

const UserCollection = mongoose.model('users', userSchema);

export default UserCollection;