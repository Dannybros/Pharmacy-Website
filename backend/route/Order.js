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

router.post('/get-detail', (req, res)=>{
    const {id} = req.body;

    OrderDetailCollection.findOne({orderID:id}, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

router.post('/', async(req, res)=>{
    const {userID, name, address, phone, method, total, cart} = req.body;

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
        orderItems:cart,
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