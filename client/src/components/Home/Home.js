import React from 'react'
import './Home.scss'
import {Container, Row, Col} from 'react-bootstrap';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CarouselBox from './Carousel';
import pharmacy from '../../img/pharmacy.jpg'
import tradition from '../../img/promo-img1.jpg'
import modern from '../../img/modern.jpg'
import traditional2 from '../../img/tradition.jpg'

function Home() {
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

      <section className='popular__product'>
        <Container>
          <h1>Popular Products</h1>
          <CarouselBox/>
        </Container>

       
      </section>

      <section>
        <Container className='promo_hero_section'>
          <img src={pharmacy} alt=""/>
          <div className='promo_description1'>
            <p>
              Medicines are a core part of health-care services and their use has grown enormously during the last century with the advent of effective antibiotics, anesthetics, painkillers and many other medicines.
            </p>
            <p>
              They can cure diseases, relieve symptoms and prevent future ill-health. Appropriate medicine use means providing the right medicine at the right dose, when it is needed, and avoiding medicines that are unnecessary or are unlikely to result in health benefits.  It means choosing the treatment with the best effectiveness and safety profile among available alternatives and the least costly of equivalent treatments.
            </p>
            <p>
              These decisions require knowledge of a person’s health condition, life situation and preferences and access to unbiased, comparative information on the benefits and harmful effects of the range of available treatment options.
            </p>

          </div>
        </Container>

        <Container className='promo_hero_section'>
          <div className='promo_description1'>
            <p>
              Plant-based remedies, such as those most commonly used in Eastern Asia, are effective at treating a number of symptoms and ailments. While they may not cure diseases and heal all chronic conditions, herbal remedies can ease the symptoms of these ailments.
            </p>
            <p>
              They can treat coughs, colds, flu, fevers and sore throats. Some remedies can support the entire immune system, making them ideal for supplementary medication.
            </p>

            Here are some of the other benefits of traditional medicines:
            <li> more affordable than most conventional medicines</li>
            <li> easy to obtain and don’t require prescriptions</li>
            <li> strengthen the overall immune system</li>
            <li> more affordable than most conventional medicines.</li>
            <li> found in nature, so cost very little to harvest and produce</li>

          </div>
          <img src={tradition} alt=""/>
        </Container>
      </section>

      <section className='product_types_section'>
        <div className='medicine_type'>
          <img src={traditional2} alt=""/>
          <h5>TRADITIONAL MEDICINE</h5>
          <button>See More</button>
        </div>

        <div className='medicine_type'>
          <img src={modern} alt=""/>
          <h5>MODERN MEDICINE</h5>
          <button>See More</button>
        </div>
      </section>

      <section className='reviewers_section'>
        <h1>Reviews</h1>
        <Container className='review_box_container'>
          <div className="review_box">
            <div className='review_user_icon_box'>
              <PersonOutlineIcon className='review_user_icon'/>
            </div>
            <div className='review_userName'>
              <h5>Danny lee</h5>
              <p>(⭐⭐⭐⭐⭐)</p>
            </div>
            <div className='review_msg'>
            There was no ring on his finger. That was a good sign although far from proof that he was available. Still, it was much better than if he had been wearing a wedding ring on his hand. She glanced at his hand a bit more intently to see if there were any tan lines where a ring may have been, and he's simply taken it off. She couldn't detect any which was also a good sign and a relief. The next step would be to get access to his wallet to see if there were any family photos in it.
            </div>
          </div>

          <div className="review_box">
            <div className='review_user_icon_box'>
              <PersonOutlineIcon className='review_user_icon'/>
            </div>
            <div className='review_userName'>
              <h5>Danny lee</h5>
              <p>(⭐⭐⭐⭐)</p>
            </div>
            <div className='review_msg'>
            There was no ring on his finger. That was a good sign although far from proof that he was available. Still, it was much bet
            </div>
          </div>

          <div className="review_box">
            <div className='review_user_icon_box'>
              <PersonOutlineIcon className='review_user_icon'/>
            </div>
            <div className='review_userName'>
              <h5>Danny lee</h5>
              <p>(⭐⭐)</p>
            </div>
            <div className='review_msg'>
            There was no ring on his finger. That was a good 
            </div>
          </div>
        </Container>
        <span className='skew'></span>
        <span className='skew_two'></span>
      </section>

      <section className='footer'>
      </section>
    </div>
  )
}

export default Home