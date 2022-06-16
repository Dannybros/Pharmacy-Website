import React from 'react'
import './Sidebar.scss'
import {Container} from 'react-bootstrap'
import logo from '../../img/MedLogo.png'
import {NavLink, useNavigate} from 'react-router-dom'

function Sidebar() {

  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <Container className='h-100 sidebar_container'>
          <img src={logo} alt=""/>
          <div className='link_box'>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/">
              <li> Home </li>
            </NavLink>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/employee">
              <li> Organize Info </li>
            </NavLink>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/import-product">
              <li> Import Products </li>
            </NavLink>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/order_product-list">
              <li> Order List </li>
            </NavLink>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/report">
              <li> Report </li>
            </NavLink>
          </div>
      </Container>
    </div>
  )
}

export default Sidebar