import React, {useState, useEffect} from 'react'
import { useStateValue } from '../../../Reducer/StateProvider';
import axios from '../../axios/axios'
import Swal from 'sweetalert2'
import {useTranslation} from 'react-i18next'
import {Paper,Typography, Rating, Button, Box} from '@mui/material'

function Review({id}) {
    const [review, setReview] = useState({update:false, value:null, des:""});
    const [{user}] = useStateValue();
    const {t} = useTranslation();
    
    useEffect(() => {
        const fetchReview=async()=>{
            await axios.post('/review/get/one', {reviewTo:id, userId:user._id})
            .then(res=>{
                setReview({update:true, value:res.data.data.value, des:res.data.data.des})
            })
            .catch(err=>{
                console.log(err);
            })
        }
        fetchReview()
    }, [user, id])

    const handleSubmitReview=()=>{
        if (Object.keys(user).length===0) alert("You must be logged in to leave review")
        else if (review.value===null) alert("Please Rate Star")
        else{
            const url = review.update? '/review/update':'/review/insert'
            const query = {reviewTo:id, review:{_id:user._id, name:user.username, value:review.value, des:review.des}}
            axios.post(url, query)
            .then(res=>{
                Swal.fire({
                  title: 'success',
                  text: res.data.message,
                  icon: 'success',
                })

                setReview({...review, update:true})
            })
            .catch((error)=>{
                Swal.fire({
                  title: 'error',
                  text: error.response.data.message,
                  icon: 'warning',
                })
            })
        }
    }

  return (
    <Box sx={{mt:3}} className='product_review_bg'>
        <Paper className="review_box" elevation={3} sx={{p:3, display:'flex', flexDirection:"column", alignItems:"center"}}>
            <Typography variant="h6" sx={{textAlign:'center'}}>
                {!review.update? t('ProductInfo.review.heading1') : t('ProductInfo.review.heading2')}  
            </Typography>
            <Rating 
                className='rating_box'
                name="no-value" 
                size="large" 
                value={review.value}
                onChange={(event, newValue) => {
                    setReview({...review, value:newValue});
                }}
                sx={{mt:2, mb:4}}
            />
            <textarea style={{height:"90px"}} className="form-control" value={review.des} placeholder='Give Review...' onChange={(e)=>{
                setReview({...review, des:e.target.value})
            }}/>
        
            <Button variant="contained" sx={{mt:2}} onClick={handleSubmitReview}>
                {review.update? t('ProductInfo.review.btn1') : t('ProductInfo.review.btn2')}
            </Button>
        </Paper>
    </Box>
  )
}

export default Review