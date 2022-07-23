import React, {useState, useEffect} from 'react'
import axios from '../axios/axios'
import {Paper,Typography, Rating, Button} from '@mui/material'
import {useStateValue} from '../../Reducer/StateProvider'
import Swal from 'sweetalert2'

function Review() {
    const [review, setReview] = useState({value:null, des:""});
    const [{user}] = useStateValue();

    useEffect(() => {
      const fetchReview=async()=>{
        await axios.get('/review/get/one', {id:"shop", userId:user._id})
      }
    }, [])
    

    const handleSubmitReview=()=>{
        if (review.value===null) alert("Please Rate Star")
        else{

            axios.get('/review/get/one',  {id:"shop", review:{_id:user._id, name:user.username, ...review}})
            .then(res=>{
                Swal.fire({
                  title: 'success',
                  text: res.data.message,
                  icon: 'success',
                })
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
        <Paper className="review_box" elevation={3} sx={{p:3, display:'flex', flexDirection:"column", alignItems:"center"}}>
            <Typography variant="h6">
                Please Give A Review About The Shop
            </Typography>
            <Rating 
                name="no-value" 
                size="large" 
                value={review.value}
                onChange={(event, newValue) => {
                    setReview({...review, value:newValue});
                }}
                sx={{transform:"scale(1.5)", mt:2, mb:4}}
            />
            <textarea style={{height:"90px"}} className="form-control" placeholder='Give Review...'/>
           
            <Button variant="contained" sx={{mt:2}} onClick={handleSubmitReview}>
                Upload
            </Button>
        </Paper>
    )
}

export default Review