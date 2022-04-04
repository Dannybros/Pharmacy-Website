import React, {useState} from 'react'
import './Home.scss'
import {Container, Row, Col} from 'react-bootstrap';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CarouselBox from './Carousel';


function Home() {

  const [skew1, setSkew1] = useState(-5);
  const [skew2, setSkew2] = useState(5);

  window.addEventListener('scroll', ()=>{
    setSkew1( -15 + window.scrollY/45);
    setSkew2(15 + window.scrollY/-45);
  })

  return (
    <div>
      <section className='Hero'>
        <img src="" className='main__hero__img' alt=""/>

        <div className='msg__hero'>
          <button>Shop Now</button>
          <h5>Bringing the medicine at your door</h5>
          <p>Dedicated to health and wellness. Healthier {'&'} happier!</p>
        </div>
      </section>

      <Row className='hero__tag'>
        <Col md ={4} sm={6} xs={12} className='hero_msg_box'>
          <div className='msg__tag'>
            <div>
              <LocalPhoneIcon className="msg__tag_icon"/>
              <h4>CONTACT NUMBER</h4>
              <h5>020-54-115-403</h5>
              <p>Please Contact This Number If You Have Any Question</p>
            </div>
            <button className='btn__msg_redirect'>
              More About Us
            </button>
          </div>
        </Col>

        <Col md ={4} sm={6} xs={12} className="hero_msg_box">
          <div className='msg__tag'>
            <div>
              <PunchClockIcon className='msg__tag_icon'/>
              <h4>WORKING HOURS</h4>
              <li>MON-FRI: 10:00 AM - 08:00 PM</li>
              <li>SAT-SUN: 03:00 PM - 08:00 PM</li>
            </div>
            <button className='btn__msg_redirect'>
              More About Us
            </button>
          </div>
        </Col>

        <Col md ={4} sm={12} xs={12} className='hero_msg_box'>
          <div className='msg__tag'>
            <div>
              <LocalOfferIcon className='msg__tag_icon'/>
              <h4>BEST PRICE OFFERS</h4>
              <p>Affordable services, lower price. Quality products at a lower price.
                Custom website at affordable prices</p>
            </div>
            <button className='btn__msg_redirect'>
              Shop Now
            </button>
          </div>
        </Col>
      </Row>

      <section className='promo__product'>
        <Container>
          <h1>Popular Products</h1>

          <CarouselBox/>
        </Container>

        <span className='skew' style={{transform:`skewY(${skew1}deg)`}}></span>
        <span className='skew_two' style={{transform:`skewY(${skew2}deg)`}}></span>
      </section>
    </div>
  )
}

export default Home