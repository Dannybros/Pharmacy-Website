import React, {useState, useEffect} from 'react'
import {Rating} from '@mui/material'
import {Container} from 'react-bootstrap'
import axios from '../axios/axios'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function ReviewTop3() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReview=async()=>{
          await axios.get('/review/shop/top3')
          .then(res=>{
            setReviews(res.data.data)
          })
          .catch(err=>{
              console.log(err);
          })
        }
        fetchReview()
      }, [])

  return (
    <Container className='review_box_container'>
        {reviews.length>0 &&
            reviews.map((item)=>{
                return(
                    <div className="review_box" key={item._id}>
                        <div className='review_user_icon_box'>
                            <PersonOutlineIcon className='review_user_icon'/>
                        </div>
                        <div className='review_userName'>
                            <h5>{item.name}</h5>
                            <Rating value={item.value} precision={0.5} readOnly/>
                        </div>
                        <div className='review_msg'>
                            {item.des}
                        </div>
                    </div>
                )
            })
        } 
    </Container>
  )
}

export default ReviewTop3