
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    OrderID:mongoose.ObjectId,
    OrderDate:String,
    UserID:String,
    Status:String
})

const OrderCollection = mongoose.model('orders', orderSchema);

export default OrderCollection;