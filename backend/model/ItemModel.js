
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    name:String,
    type:String,
    quantity:String,
    price:Number,
    weight:String,
    brand:String,
    description:String,
    expireDate:String,
    img:String
})

const ItemCollection = mongoose.model('items', itemSchema);

export default ItemCollection;