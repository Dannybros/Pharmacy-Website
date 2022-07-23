import React from 'react'
import './AboutUs.scss'
import {Row, Col} from 'react-bootstrap'
import {Box, Container, Typography, ImageList, ImageListItem, Paper, Stack, Rating} from '@mui/material'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CarouselBox from '../Home/Carousel';
import Reviews from './Reviews';
import Review from './Review';

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

  return (
    <div>
        <Box className='aboutUs_hero' >
           <Typography variant="h3" component="h3"><b>About Us</b> </Typography>
        </Box>

        <Box className='intro_section'>
            <Container className="intro_container" maxWidth="sm">
                <Typography variant="h6" color="primary" sx={{fontFamily:"oswald", fontStyle:"italic", fontWeight:"bold", textAlign:'center'}}>
                    “PHARMACY WEBSITE DESIGN THAT ENGAGES YOUR AUDIENCE AND CONVERTS THEM. THAT’S WHAT IT SHOULD DO.”
                </Typography>
                <Typography component="p" variant="h8" sx={{mt:5}}>
                    We believe that traditional medicine has a long history. It is the sum total of the knowledge, skill, and practices based on the theories, beliefs, and experiences indigenous to different cultures, whether explicable or not, used in the maintenance of health as well as in the prevention, diagnosis, improvement or treatment of physical and mental illness.
                </Typography>
                <Typography component="p" variant="h8" sx={{mt:5}}>
                    Traditional Korean medicine has a deep trust and high public satisfaction as a traditional medicine intervention and as a national characteristic of medicine in Korea 
                </Typography>
                <Typography component="p" variant="h8" sx={{mt:5}}>
                   We bring you these traditional korean medicine to laos and sell them cheaply, also provide free delivery. Just a few clicks and these medicine are on their way to your home in no time.
                </Typography>
                <Typography component="p" variant="h8" sx={{mt:5}}>
                    Putting our clients’ needs has been at the core of our team’s culture since day one. We began as a small web design agency and have spent over a decade growing exponentially into a comprehensive digital agency, which provides the best possible design, development, and marketing services for the pharmacy industry through our philosophy of ensuring delivery
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
                  <Typography variant="h6" component="h6" sx={{minWidth:150}}> Contact Number: </Typography> 
                  <Typography variant="subtitle1" component="div">
                    <LocalPhoneIcon sx={{mx:2}}/>
                    + 020 554 7844
                  </Typography>
                </Paper>

                <Paper sx={{display:'flex', alignItems:"center", p:2}} variant="outlined">
                  <Typography variant="h6" component="h6" sx={{minWidth:150}}> Contact Email: </Typography> 
                  <Typography variant="subtitle1" component="div">
                    <EmailIcon sx={{mx:2}}/>
                    + 020 554 7844
                  </Typography>
                </Paper>

                <Paper sx={{display:'flex', alignItems:"center", p:2}} variant="outlined">
                  <Typography variant="h6" component="h6" sx={{minWidth:150}}> Address: </Typography> 
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
                    "Payment Method Intro"
                </Typography>
                <Box sx={{ml:3, mt:4}}>
                  <Typography variant="h6"  color="error" sx={{fontFamily:"oswald", fontStyle:"italic", fontWeight:"bold"}}>
                      "Credit Card"
                  </Typography>
                  <Typography component="p" variant="h8" sx={{ml:2}}>
                    Credit cards allow customers to borrow funds from a bank and either pay the balance in full each month or pay the money back with interest. Debit cards make payments by deducting money directly from a customer‘s checking account, rather than using a line of credit. <br/><br/>

                    We are using Stripe Payment gateway to validate your credit card and also keep your private info safe when purchasing our medicine. Stripe was founded in 2010 with the mission of making it easier to accept payments over the internet. At the time, taking credit cards meant working with a legacy processor or a middleman broker who would provide you with access to a processor. 
                  </Typography>
                </Box>

                <Box sx={{ml:3, mt:4}}>
                  <Typography variant="h6"  color="error" sx={{fontFamily:"oswald", fontStyle:"italic", fontWeight:"bold"}}>
                    "Cash"
                  </Typography>
                  <Typography component="p" variant="h8" sx={{ml:2}}>
                    Cash is legal tender—currency or coins—that can be used to exchange goods, debt, or services. Sometimes it also includes the value of assets that can be easily converted into cash immediately, as reported by a company.
                    <br/> <br/>
                    Ultimately, individuals use a mix of both cash and credit cards for different kinds of purchases. While paying in cash will most likely help you save money and make fewer impulse purchases, paying in credit cards does offer an enviable convenience and allow you to afford larger items—given you monitor your spending carefully and make sure to pay off your balance each month.
                    <br/> <br/>
                    With cash, your spending is straightforward and there is less risk of identity theft. Ultimately, it's up to each individual to make the best decisions based on their financial health, what they are purchasing, and the risks they are willing to incur.
                    <br/> <br/>
                    BCEL ONE PAY is one of the most used and popular online money transfer app in Laos. Unfortunately, We still haven't registered for BCEL Bank Payment Gateway to verify whether you have paid or not. <b>If you wish to pay with BCEL ONE PAY, then Please choose option "Cash" when purchasing and do the transaction with Deliverymen. </b>
                  </Typography>
                </Box>
            </Container>
        </Box>


        <Container>
          <CarouselBox CarouselItem={Reviews}/>
        </Container>
        
        <Box sx={{mt:3}} className='review_bg'>
            <Review/>
        </Box>
    </div>
  )
}

export default AboutUs