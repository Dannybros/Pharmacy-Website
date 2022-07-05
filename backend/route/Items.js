import express from 'express'
import ItemCollection from '../model/ItemModel.js';

const router = express.Router();

router.get('/', (req, res)=>{
    ItemCollection.find({}, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
})

router.post('/delete', (req,res)=>{
    const {id} = req.body;
    ItemCollection.find({_id: id}, (err, data)=>{
        if(err){
            res.status(500).json({error:err});
        }else{
            res.status(201).send({message:"Deleted Successfully"});
            
        }
    }).deleteOne();
})


router.post('/update', (req,res)=>{
    const {_id, name, type, price, brand, weight, quantity, description, expireDate, imgUrl} = req.body;

    if(name=="" || type=="" || price=="" || brand=="" || weight=="" || quantity=="" || description=="" || expireDate=="" || imgUrl==""){
        res.status(400).json({
            message:"Please fill in all the fields"
        });
    }

    ItemCollection.findByIdAndUpdate(_id, {
        name:name,
        type:type,
        quantity:Number(quantity),
        price:Number(price),
        weight:weight,
        brand:brand,
        description:description,
        expireDate:expireDate,
        img:imgUrl
    }, ({new:true}), (err, data)=>{
        if(err){
            res.status(500).json({message:"Updated Failed. Please Try Again"})
        }else{
            res.status(201).json({data:data, message:"Updated Success", data:data})
        }
    })

})

router.post('/', (req, res)=>{

    const {name, type, price, brand, weight, quantity, description, expireDate, imgUrl} = req.body

    if(name=="" || type=="" || price=="" || brand=="" || weight=="" || quantity=="" || description=="" || expireDate=="" || imgUrl==""){
        res.status(400).json({
            message:"Please fill in all the fields"
        });
    }

    const product = new ItemCollection({
        name:name,
        type:type,
        quantity:Number(quantity),
        price:Number(price),
        weight:weight,
        brand:brand,
        description:description,
        expireDate:expireDate,
        img:imgUrl
    })

    product.save()
    .then(result=>{
        res.status(201).json({
            message:"Employee registered successfully",
            data:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
})

router.post('/test', (req, res)=>{
    req.io.emit("new-message",{message:"test2"});
})

export default router;