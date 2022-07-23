import React, {useEffect, useState} from 'react'
import './AboutUs.scss'
import {Row, Col} from 'react-bootstrap'
import {Box, Container, Typography, ImageList, ImageListItem, Paper, Stack} from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CarouselBox from '../Home/Carousel';
import ReviewList from './ReviewList';
import Review from './Review';
import axios from '../axios/axios'
import { useTranslation, Trans } from 'react-i18next';

function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
}

function AboutUs() {

  const itemData = [
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          title: 'Breakfast',
          rows: 2,
          cols: 2,
        },
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          title: 'Burger',
        },
        {
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          title: 'Camera',
        },
        {
          img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
          title: 'Coffee',
          cols: 2,
        },
        {
          img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
          title: 'Hats',
          cols: 3,
        },
        {
          img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
          title: 'Honey',
          author: '@arwinneil',
          rows: 2,
        },
        {
          img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
          title: 'Basketball',
          cols: 3,
        }
  ];

  const {t} = useTranslation();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReview=async()=>{
      await axios.post('/review/get/top5', {reviewTo:"shop"})
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
    <div>
        <Box className='aboutUs_hero' >
           <Typography variant="h3" component="h3"><b>{t('Home.nav.list4')}</b> </Typography>
        </Box>

        <Box className='intro_section'>
            <Container className="intro_container" maxWidth="sm">
                <Typography variant="h6" color="primary" sx={{fontFamily:"oswald", fontStyle:"italic", fontWeight:"bold", textAlign:'center'}}>
                    "{t('About.intro1.heading1')}"
                </Typography>
                <Typography component="p" variant="h8" sx={{mt:5}}>
                  {t('About.intro1.heading2')}
                </Typography>
                <Typography component="p" variant="h8" sx={{mt:5}}>
                  {t('About.intro1.heading3')}
                </Typography>
                <Typography component="p" variant="h8" sx={{mt:5}}>
                  {t('About.intro1.heading4')}
                </Typography>
                <Typography component="p" variant="h8" sx={{mt:5}}>
                  {t('About.intro1.heading5')}
                </Typography>
            </Container>
        </Box>

        <Container>
          <Row>
            <Col xs={12} md={6}>
                <ImageList
                    sx={{ width: '100%'}}
                    variant="quilted"
                    cols={4}
                    rowHeight={90}
                >
                    {itemData.map((item, i) => (
                        <ImageListItem key={i} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                            {...srcset(item.img, 120, item.rows, item.cols)}
                            alt={item.title}
                        />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Col>
            <Col item xs={12} md={6}>
              <Stack spacing={4} direction="column" justifyContent="space-around" sx={{height:'100%'}}>
                <Paper sx={{display:'flex', alignItems:"center", p:2}} variant="outlined">
                  <Typography variant="h6" component="h6" sx={{minWidth:150}}>
                    {t('About.intro2.list1')} : 
                  </Typography> 
                  <Typography variant="subtitle1" component="div">
                    <LocalPhoneIcon sx={{mx:2}}/>
                    + 020 554 7844
                  </Typography>
                </Paper>

                <Paper sx={{display:'flex', alignItems:"center", p:2}} variant="outlined">
                  <Typography variant="h6" component="h6" sx={{minWidth:150}}>
                    {t('About.intro2.list2')} :
                  </Typography> 
                  <Typography variant="subtitle1" component="div">
                    <EmailIcon sx={{mx:2}}/>
                    + 020 554 7844
                  </Typography>
                </Paper>

                <Paper sx={{display:'flex', alignItems:"center", p:2}} variant="outlined">
                  <Typography variant="h6" component="h6" sx={{minWidth:150}}>
                    {t('About.intro2.list3')} :
                  </Typography> 
                    <AddLocationIcon sx={{mx:2}}/>
                  <Typography variant="subtitle1" component="div">
                   this is they sslske ssk <br/>
                   this is they sslske ssk <br/>
                   asdfasd
                  </Typography>
                </Paper>
              </Stack>
            </Col>
          </Row>
        </Container>

        <Box className='intro_section'>
            <Container className="intro_container">
                <Typography variant="h5" sx={{fontFamily:"oswald", fontStyle:"italic", fontWeight:"bold"}}>
                    "{t('About.intro3.heading')}"
                </Typography>
                <Box sx={{ml:3, mt:4}}>
                  <Typography variant="h6"  color="error" sx={{fontFamily:"oswald", fontStyle:"italic", fontWeight:"bold"}}>
                      "{t('About.intro3.part1.title')}"
                  </Typography>
                  <Typography component="p" variant="h8" sx={{ml:2}}>
                    {t('About.intro3.part1.p1')}
                    <br/><br/>
                    {t('About.intro3.part1.p2')} 
                  </Typography>
                </Box>

                <Box sx={{ml:3, mt:4}}>
                  <Typography variant="h6"  color="error" sx={{fontFamily:"oswald", fontStyle:"italic", fontWeight:"bold"}}>
                    "{t('About.intro3.part2.title')}"
                  </Typography>
                  <Typography component="p" variant="h8" sx={{ml:2}}>
                    {t('About.intro3.part2.p1')}
                    <br/> <br/>
                    {t('About.intro3.part2.p2')}
                    <br/> <br/>
                    {t('About.intro3.part2.p3')}
                    <br/> <br/>
                    <Trans i18nKey="About.intro3.part2.p4" />
                  </Typography>
                </Box>
            </Container>
        </Box>

        <Container>
          <CarouselBox CarouselItem={ReviewList} data={reviews}/>
        </Container>
        
        <Box sx={{mt:3}} className='review_bg'>
            <Review/>
        </Box>
    </div>
  )
}

export default AboutUs