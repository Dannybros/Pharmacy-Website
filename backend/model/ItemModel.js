
import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    ProductTypeID:String,
    ProductName:String,
    Quantity:String,
    Price:Number,
    Weight:String,
    Brand:String,
    Description:String,
    ExpireDate:String
})

const ItemCollection = mongoose.model('items', itemSchema);

export default ItemCollection;