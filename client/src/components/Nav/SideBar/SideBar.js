import React from 'react'
import './Sidebar.scss'
import CloseIcon from '@mui/icons-material/Close';
import {NavLink} from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import {Button} from 'react-bootstrap';

function SideBar(props) {
  return (
    <div className='col-12 sidebar_page'>
        <div className='dark-light_Bg' onClick={props.click}/>
        <main className='col-xs-12 col-sm-4 side-bar'>
            <CloseIcon className="closing_icon" onClick={props.click}/>
            <div className='user_info_box'>
                <PersonOutlineIcon className='user__icon'/>
                <div className='user__info'>
                    <span className='user__info__name'><b>Guest</b></span>
                    <div className='user__info__email'><b>none</b></div>
                </div>
                <Button className='mx-4 p-1 btn_log_in'>
                    Log In
                </Button>
                <Button className='mx-4 py-1 px-3 btn_sign_out'>
                    <LogoutIcon/>
                </Button>
            </div>
            <div className='d-flex links_box'>
                <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={props.click} to="/">
                    <li> Home </li>
                </NavLink>

                <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={props.click} to="/product/discover">
                    <li> Shop </li>
                </NavLink>

                <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={props.click} to="/about-us">
                    <li> Contact </li>
                </NavLink>
                
                <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={props.click} to="/cart">
                    <li> Check Out </li>
                </NavLink>
            </div>
        </main>
    </div>
  )
}

export default SideBar