import express from 'express'
import ItemCollection from '../model/ItemModel.js';

const router = express.Router();

router.get('/', (res, req)=>{
    ItemCollection.find({}, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

export default router;