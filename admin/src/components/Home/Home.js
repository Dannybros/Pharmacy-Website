import React, {useState} from 'react'
import './Home.scss'
import {Container, Button} from 'react-bootstrap'

function Home() {

  const [currentLocation, setCurrentLocation] = useState({});

  const getLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setCurrentLocation(position.coords);
    })
  }

  return (
    <div>
      <Container className='home_page'>
        Home
        <Button onClick={getLocation}>Location</Button>
        <p>
          {currentLocation.latitude} &nbsp;&nbsp;&nbsp;&nbsp;
          {currentLocation.longitude}
        </p>
        <h1>dasdfad</h1>
      </Container>
    </div>
  )
}

export default Home