import React, {useState} from 'react'
import './Home.scss'
import { Container} from 'react-bootstrap';

function Home() {

  const [skew1, setSkew1] = useState(-15);
  const [skew2, setSkew2] = useState(15);

  window.addEventListener('scroll', ()=>{
    setSkew1( -15 + window.scrollY/45);
    setSkew2(15 + window.scrollY/-45);
  })

  return (
    <Container>
      <section className='tester'>
        bg1
        <span className='skew' style={{transform:`skewY(${skew1}deg)`}}></span>
        <span className='skew_two' style={{transform:`skewY(${skew2}deg)`}}></span>
      </section>
      <section className='test2'>
        bg2
      </section>
    </Container>
  )
}

export default Home