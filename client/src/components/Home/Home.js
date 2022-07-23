import React from 'react'
import './Home.scss'
import {useNavigate} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap';
import PunchClockIcon from '@mui/icons-material/PunchClock';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CarouselBox from './Carousel';
import pharmacy from '../../img/pharmacy.jpg'
import tradition from '../../img/promo-img1.jpg'
import modern from '../../img/modern.jpg'
import traditional2 from '../../img/tradition.jpg'
import ScrollTop from './ScrollTop';
import { useTranslation } from 'react-i18next';
import ReviewTop3 from './Review';

function Home() {

  const navigate = useNavigate();
  const {t} = useTranslation();

  function CarouselItem(){
    return(
      <div className="carousel__item">
            <div className="item_img_box" style={{background:"url('https://picsum.photos/200/300')"}}>
                <button className="btn_view_item"><VisibilityIcon className="eye_icon"/> View Item</button>
            </div>
            <div className="item_info_box">
                <span>Title Title TitleTitle Title Title TitleTitle</span>
                <span>(20$)</span>
            </div>
        </div>
    )
  }
  
  return (
    <div style={{position:"relative"}}>
      <section className='Hero'>
        <img src="" className='main__hero__img' alt=""/>

        <div className='msg__hero'>
          <button onClick={()=>navigate('/product/discover')}>{t('Home.Hero.button')}</button>
          <h5>{t('Home.Hero.heading1')}</h5>
          <p>{t('Home.Hero.heading2')}</p>
        </div>
      </section>

      <ScrollTop/>

      <Row className='hero__tag'>
        <Col md ={4} sm={6} xs={12} className='hero_msg_box'>
          <div className='msg__tag'>
            <div>
              <LocalPhoneIcon className="msg__tag_icon"/>
              <h4>{t('Home.Grid.item1.title')}</h4>
              <h5>020-54-115-403</h5>
              <p>{t('Home.Grid.item1.des')}</p>
            </div>
            <button className='btn__msg_redirect' onClick={()=>navigate('/about')}>
              {t('Home.Grid.button')}
            </button>
          </div>
        </Col>

        <Col md ={4} sm={6} xs={12} className="hero_msg_box">
          <div className='msg__tag'>
            <div>
              <PunchClockIcon className='msg__tag_icon'/>
              <h4>{t('Home.Grid.item2.title')}</h4>
              <li>MON-FRI: 10:00 AM - 08:00 PM</li>
              <li>SAT-SUN: 03:00 PM - 08:00 PM</li>
            </div>
            <button className='btn__msg_redirect' onClick={()=>navigate('/about')}>
              {t('Home.Grid.button')}
            </button>
          </div>
        </Col>

        <Col md ={4} sm={12} xs={12} className='hero_msg_box'>
          <div className='msg__tag'>
            <div>
              <LocalOfferIcon className='msg__tag_icon'/>
              <h4>{t('Home.Grid.item3.title')}</h4>
              <p>{t('Home.Grid.item3.des')}</p>
            </div>
            <button className='btn__msg_redirect' onClick={()=>navigate('/product/discover')}>
              {t('Home.Hero.button')}
            </button>
          </div>
        </Col>
      </Row>

      {/* <section className='popular__product'>
        <Container>
          <h1>Popular Products</h1>
          <CarouselBox CarouselItem={CarouselItem}/>
        </Container>
      </section> */}

      <section>
        <Container className='promo_hero_section'>
          <img src={pharmacy} alt=""/>
          <div className='promo_description1'>
            <p>
              {t('Home.Intro.item1.p1')}
            </p>
            <p>
              {t('Home.Intro.item1.p2')}
            </p>
            <p>
              {t('Home.Intro.item1.p3')}
            </p>

          </div>
        </Container>

        <Container className='promo_hero_section'>
          <div className='promo_description1'>
            <p>{t('Home.Intro.item2.p1')}</p>
            <p>{t('Home.Intro.item2.p2')}</p>

            {t('Home.Intro.item2.p3.title')}
            <li> {t('Home.Intro.item2.p3.list1')}</li>
            <li> {t('Home.Intro.item2.p3.list2')}</li>
            <li> {t('Home.Intro.item2.p3.list3')}</li>
            <li> {t('Home.Intro.item2.p3.list4')}</li>
            <li> {t('Home.Intro.item2.p3.list5')}</li>

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
        <h1> {t('ProductInfo.Reviews')}  </h1>
        <ReviewTop3/>
        {/* <Container className='review_box_container'>
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
        </Container> */}
        <span className='skew'></span>
        <span className='skew_two'></span>
      </section>

      <section className='footer'>
        <Container style={{borderBottom:"1px solid grey"}}>
          <Row>
            <Col sm={12} md={6} className="px-4">
              <h5>{t('Home.Footer.About.title')}</h5>
              <p style={{textAlign:"justify"}}>{t('Home.Footer.About.heading')}</p>
            </Col>

            <Col xs={6} md={3} className="px-4">
              <h5>{t('Home.Footer.contact.title')}</h5>
              <ul className='footer__address'>
                <li>
                  {t('Home.Footer.contact.list1')}:  020 539 283 33
                </li>
                <li>{t('Home.Footer.contact.list2')}: example@gmail.com </li>
                <li>{t('Home.Footer.contact.list3')}: Somewhere Rd. Vientiane </li>
              </ul>
            </Col>

            <Col xs={6} md={3} className="px-4">
              <h5>{t('Home.Footer.links.title')}</h5>
              <ul className='footer__links'>
                <li><a href="/home">
                  {t('Home.nav.list1')}
                </a></li>

                <li><a href="/product/discover">
                  {t('Home.Footer.links.list1')}
                </a></li>

                <li><a href="/about">
                  {t('Home.Footer.links.list2')}
                </a></li>

                <li><a href="/cart">
                  {t('Home.Footer.links.list3')}
                </a></li>
              </ul>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <p className='mt-2' style={{textAlign:"justify"}}>
            Copyright &copy; 2022 All Rights Reserved by Danny
            </p>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home