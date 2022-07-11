
import mongoose from 'mongoose'

const orderDetailSchema = new mongoose.Schema({
    orderID:String,
    productID:String,
    productName:String,
    productPrice:Number,
    quantity:Number,
    total:Number
})

const OrderDetailCollection = mongoose.model('order_details', orderDetailSchema);

export default OrderDetailCollection;