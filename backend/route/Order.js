import express from 'express'
import OrderCollection from '../model/OrderModel.js';
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

router.get('/pending', (req, res)=>{
    OrderCollection.find({status:"Pending"}, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

router.get('/delivery', (req, res)=>{
    OrderCollection.find({status:"On Delivery"}, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

router.post('/user', (req, res)=>{
    const {_id} = req.body;
    OrderCollection.find({customerID:_id}, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

router.post('/checked', (req, res)=>{
    const {_id} = req.body;

    OrderCollection.findByIdAndUpdate(_id, {checked:true}, ({new:true}), (err, data)=>{
        if(err){
            res.status(500).json({
                error:err
            });
        }else{
            req.io.emit("checked_order", {data:data});
        }
    })
})

router.post('/start_delivery', (req, res)=>{
    const {_id, customerID, empName} = req.body;

    OrderCollection.findByIdAndUpdate(_id, {employeeName:empName, status:"On Delivery"}, ({new:true}), (err, data)=>{
        if(err){
            res.status(500).json({
                error:err
            });
        }else{
            req.io.emit("order_start_end", {data:data, message:`Start Delivery ID ${_id} by ${empName}`});
            const clientSocket = onlineUsers.get(customerID);
            req.io.to(clientSocket).emit("order_update", {data:data})
        }
    })
})

router.post('/complete_order', (req, res)=>{
    const {_id, customerID} = req.body;

    OrderCollection.findByIdAndUpdate(_id, {status:"Completed"}, ({new:true}), (err, data)=>{
        if(err){
            res.status(500).json({
                error:err
            });
        }else{
            req.io.emit("order_start_end", {data:data, message:`Order ID ${_id} completed`});
            const clientSocket = onlineUsers.get(customerID);
            req.io.to(clientSocket).emit("order_update", {data:data})
        }
    })
})

router.post('/', async(req, res)=>{
    const {userID, name, address, phone, method, total, cart} = req.body;

    const order = new OrderCollection({
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