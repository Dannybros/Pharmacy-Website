import React, {useState} from 'react'
import './Sidebar.scss'
import {Container, Modal} from 'react-bootstrap'
import logo from '../../img/MedLogo.png'
import {NavLink} from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function Sidebar() {

  const [show, setShow] = useState(false);

  return (
    <div className="sidebar">
      <Container className='h-100 sidebar_container'>
          <img src={logo} alt=""/>
          <div className='link_box'>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/">
              <li> Home </li>
            </NavLink>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/employee">
              <li> Employee </li>
            </NavLink>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/supplier">
              <li> Supplier </li>
            </NavLink>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/import-product">
              <li> Import </li>
            </NavLink>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/order_product-list">
              <li> Order </li>
            </NavLink>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/report">
              <li> Report </li>
            </NavLink>
          </div>
          <div className='phone-menu-bar'>
            <MenuIcon onClick={() => setShow(true)}/>
          </div>
          <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
            <Modal.Header >
              <Modal.Title >
                Menu
                <CloseIcon className="btn-modal_close" onClick={() => setShow(false)}/>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='phone_sidebar-links'>
                <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={()=>setShow(false)} to="/">
                  <li> Home </li>
                </NavLink>
                <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={()=>setShow(false)} to="/employee">
                  <li> Employee </li>
                </NavLink>
                <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={()=>setShow(false)} to="/supplier">
                  <li> Supplier </li>
                </NavLink>
                <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={()=>setShow(false)} to="/import-product">
                  <li> Import Products </li>
                </NavLink>
                <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={()=>setShow(false)} to="/order_product-list">
                  <li> Order List</li>
                </NavLink>
                <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={()=>setShow(false)} to="/report">
                  <li> Report </li>
                </NavLink>
              </div>
            </Modal.Body>
          </Modal>
      </Container>
    </div>
  )
}

export default Sidebar