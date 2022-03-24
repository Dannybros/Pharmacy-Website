import React, {useState} from 'react'
import './Nav.scss';
import {NavLink, useNavigate} from 'react-router-dom'
import {Navbar, Form, Button} from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SideBar from './SideBar/SideBar';

function Nav() {
  const [openSideBar, setOpenSideBar] = useState(false);

  const navigate = useNavigate();

  return (
    <div className='navigation_box'>
      
      {/* tablet and mobile version for nav */}
      {openSideBar&&
      
        <SideBar click={()=>setOpenSideBar(false)}/>
      }

      <Navbar className='nav-bar'>
          <Navbar.Brand href="#home" className='shop_logo'>Navbar</Navbar.Brand>

          <div className='search_box d-flex align-items-center' >
            <Form.Group className="d-flex w-100" controlId="formBasicPassword">
              <Form.Control type="text" placeholder="Search..." />
              <SearchIcon className="search_icon"/>
            </Form.Group>
          </div>

          <div className='d-flex justify-content-center sign_box'>
            <Button variant="secondary mx-2" onClick={()=>navigate('/sign-in')}>Log In</Button>
            <Button variant="primary mx-2">Sign Up</Button>
          </div>

          <div className='language_box'>
            <select name="language_select" className='form-control text-center'>
              <option value="0">English</option>
              <option value="1">Lao</option>
            </select>
          </div>
      </Navbar>

      <Navbar className='category_bar p-0'>
          <div className='sub_category_panel' onClick={()=>setOpenSideBar(true)}>
            <MenuOpenIcon className='category_icon'/>
            <h4 className='mb-0'>Category</h4>
          </div>
          <ul className='p-0 m-0 d-flex justify-content-between'>
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
          <div className='currency_box'>
            <select name="currency_select" className='form-control text-center' style={{height:"100%"}}>
              <option value="0">USD ($)</option>
              <option value="1">KIP (K)</option>
            </select>
          </div>

          <div className='cart_panel'>
            <div style={{position:'relative', marginRight:'15px'}}>
              <img src="../../img/shopping cart.jpg" alt=''/>
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