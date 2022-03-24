import React from 'react'
import './Sidebar.scss'
import CloseIcon from '@mui/icons-material/Close';
import {NavLink} from 'react-router-dom'

function SideBar(props) {
  return (
    <div className='c0l-12 sidebar_page'>
        <div className='dark-light_Bg' onClick={props.click}/>
        <main className='col-xs-12 col-sm-4 side-bar'>
            <CloseIcon className="closing_icon" onClick={props.click}/>
            <img src="https://picsum.photos/id/237/200/300" className='mb-3' alt=""/>
            <div>
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

                <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={props.click} to="/cart">
                    <li> Login {'&'} Sign Up </li>
                </NavLink>
            </div>
        </main>
    </div>
  )
}

export default SideBar