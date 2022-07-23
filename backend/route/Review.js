import express from 'express'
import ReviewCollection from '../model/ReviewModal.js';

const router = express.Router();

router.get('/get/one', async(req, res)=>{

    const {id, userId} = req.body;

    const existingReview = await ReviewCollection.findOne({reviewTo:id})

    const existingUserReview = myArray.find(x => x._id === userId).foo;

    // ReviewCollection.findOne({reviewTo:id}, (err, data)=>{
    //     if(err){
    //         res.status(500).send(err);
    //     }else{
    //         res.status(201).send(data);
    //     }
    // })
})

router.post('/insert', async(req, res)=>{

    const {id, review} = req.body;

    await new ReviewCollection({reviewTo:id, reviews:[review]}).save()
    .then(result=>{
        res.status(201).json({
            message:"New Review is made",
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
})


export default router;