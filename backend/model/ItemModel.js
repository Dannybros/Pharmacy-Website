import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    title:String,
    price:Number,
    originPrice:Number,
    weight:String,
    brand:String,
    description:String,
    img:String,
    expireDate:String,
    amount:String
})

const ItemCollection = mongoose.model('items', itemSchema);

export default ItemCollection;