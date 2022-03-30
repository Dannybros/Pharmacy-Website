import React, {useState} from 'react'
import './Home.scss'
import {Container, Row, Col} from 'react-bootstrap';

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
        <Container className='py-4'>
          <Row>
            <Col md={6} xs={12} >
              <div className="main_hero_image">
                <button>Shop Now {'>>>'}</button>
              </div>
            </Col>
            <Col md={6} xs={12} className="sub_img_box">
              <div className="sub_hero_image sub_img1">
                <button>Shop Now {'>>>'}</button>
              </div>
              <div className="sub_hero_image sub_img2">
                <button>Shop Now {'>>>'}</button>
              </div>
            </Col>
          </Row>
        </Container>
        <span className='skew' style={{transform:`skewY(${skew1}deg)`}}></span>
        <span className='skew_two' style={{transform:`skewY(${skew2}deg)`}}></span>
      </section>
    </div>
  )
}

export default Home