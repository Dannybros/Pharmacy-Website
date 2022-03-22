import React from 'react'
import './Nav.scss';
import {NavLink} from 'react-router-dom'
import {Navbar, Container, Form, Button} from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Nav() {
  return (
    <div>
      <Navbar className='nav-bar p-2'>
        <Container>
          <Navbar.Brand href="#home" className='shop_logo'>Navbar</Navbar.Brand>

          <div className='search_box d-flex align-items-center' >
            <Form.Group className="w-100" controlId="formBasicPassword">
              <Form.Control type="text" placeholder="Search..." />
            </Form.Group>
            <Button>
              <SearchIcon/>
            </Button>
          </div>

          <div className='d-flex justify-content-end sign_box'>
            <Button variant="secondary mx-2">Log In</Button>
            <Button variant="primary mx-2">Sign Up</Button>
          </div>

          <div className='language_box'>
            <select name="language_select" className='form-control text-center'>
              <option value="0">English</option>
              <option value="1">Lao</option>
            </select>
          </div>

        </Container>
      </Navbar>

      <Navbar className='category_bar p-0'>
          <div className='sub_category_panel'>
            <MenuOpenIcon className='category_icon'/>
            <h4 className='mb-0'>Category</h4>
          </div>
          <ul className='p-0 m-0 d-flex'>
              <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/">
                <li> Home </li>
              </NavLink>

              <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/product/discover">
                <li> Shop </li>
              </NavLink>

              <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/about-us">
                <li> Contact </li>
              </NavLink>
              
              <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/cart">
                <li> Check Out </li>
              </NavLink>
          </ul>
          <div className='p-4 currency_box'>
            <select name="currency_select" className='form-control text-center'>
              <option value="0">USD ($)</option>
              <option value="1">KIP (K)</option>
            </select>
          </div>
          <div className='cart_panel'>
            <div style={{position:'relative', marginRight:'15px'}}>
              <ShoppingCartIcon className='cart_icon'/>
              <span className='cart_number'>0</span>
            </div>
            <h4 className='mb-0'>Cart</h4>
          </div>
      </Navbar>
    </div>
  )
}

export default Nav