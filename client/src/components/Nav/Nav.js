import React from 'react'
import './Nav.scss';
import {Navbar, Container, Form, Button} from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';

function Nav() {
  return (
    <div>
      <Navbar className='nav-bar p-2'>
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>

          <div className='search_box d-flex align-items-center' style={{width:"500px"}}>
            <Form.Group className="w-100" controlId="formBasicPassword">
              <Form.Control type="text" placeholder="Search..." />
            </Form.Group>
            <Button>
              <SearchIcon/>
            </Button>
          </div>

          <div className='d-flex'>
            <Button variant="secondary mx-2">Log In</Button>
            <Button variant="primary mx-2">Sign Up</Button>
          </div>

        </Container>
      </Navbar>

      <Navbar className='category_bar p-2'>
        <Container>

        </Container>
      </Navbar>
    </div>
  )
}

export default Nav