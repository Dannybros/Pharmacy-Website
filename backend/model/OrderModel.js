
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    customerID:String,
    customerName:String,
    customerPhone:Number,
    customerAddress:{
        addr:String,
        coords:{
            lat:String,
            lng:String
        }
    },
    orderTotal:Number,
    paymentMethod:String,
    deliveryStatus:{
        type: Boolean,
        default: false
    },
    employeeID:String
}, { timestamps: true })

const OrderCollection = mongoose.model('orders', orderSchema);

export default OrderCollection;