
import mongoose from 'mongoose'

const orderDetailSchema = new mongoose.Schema({
    OrderDetailID:mongoose.ObjectId,
    OrderID:String,
    ProductID:String,
    Amount:Number,
    Total:Number
})

const OrderDetailCollection = mongoose.model('order_detail', orderDetailSchema);

export default OrderDetailCollection;