import express from 'express'
import OrderCollection from '../model/OrderModel.js';
import OrderDetailCollection from '../model/OrderDetailModel.js';
import mongoose from 'mongoose'

const router = express.Router();

router.get('/', (req, res)=>{
    OrderCollection.find({}, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

router.get('/get-detail', (req, res)=>{
    
})

router.post('/', async(req, res)=>{
    const {userID, name, address, phone, method, total, cart} = req.body;

    const orderID = mongoose.Types.ObjectId();

    await cart.map(item=>{
        try {
            const orderDetail = new OrderDetailCollection({
                orderID:orderID,
                productID:item.id,
                productName:item.title,
                productPrice: Number(item.price),
                quantity:Number(item.quantity),
                total:Number(item.quantity) * Number(item.price)
            })

            orderDetail.save();
        } catch (error) {
            res.status(400).send(error.message);
        }
    })

    const order = new OrderCollection({
        _id:orderID,
        customerID:userID,
        customerName:name,
        customerPhone:Number(phone),
        customerAddress:{
            addr:address.addr,
            coords:{
                lat:address.coords.lat,
                lng:address.coords.lat
            }
        },
        orderTotal:Number(total),
        paymentMethod:method,
    })

    order.save()
    .then(result=>{
        res.status(201).json({
            message:"New Order registered successfully"
        })
        
        req.io.emit("new-products",{data:result});
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
    
})

export default router;