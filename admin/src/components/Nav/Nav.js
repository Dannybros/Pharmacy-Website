import React from 'react'
import './Nav.scss'
import {AppBar, Toolbar, IconButton} from '@mui/material'
import { Dropdown } from 'react-bootstrap'
import logo from '../../img/MedLogo.png'
import avatar from '../../img/avatar.png'
import jwt_decode from "jwt-decode";
import { useStateValue } from '../../context/StateProvider'
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Nav({handleDrawerToggle}) {

    const [{user}, dispatch] = useStateValue();
    
    const admin = user? jwt_decode(user) : user

    const handleLogOut=()=>{
        dispatch({
            type:'LOG_OUT'
        })
    }
  return (
    <AppBar
        position="fixed"
        sx={{
        background:"white",
        width: { md: `calc(100% - 240px)` },
        ml: { md: `240px` },
        zIndex:300
        }}
    >
        <Toolbar
        sx={{
            display:"flex",
            justifyContent:"space-between",
        }}
        >
            <img src={logo} className="logo_img" alt="logo_img"/>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' }, color:"black"}}
            >
                <MenuIcon />
            </IconButton>

            <div className='nav-bar'>
                <Dropdown className='user_box' >
                    <Dropdown.Toggle className='user_box_header'>
                        <img src={avatar} alt="user_avatar"/>
                        &nbsp;&nbsp;&nbsp; {admin?.name} &nbsp;
                    </Dropdown.Toggle>
                    
                    <Dropdown.Menu className='user_box_menu'>
                        <Dropdown.Item>
                            <AccountBoxIcon className='profile_icon'/> &nbsp; Your Profile
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            ID: &nbsp;<b>{admin?.id}</b>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Name: &nbsp;<b className='text-capitalize'>{admin?.name}</b>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                    </Dropdown.Menu>
                </Dropdown>
                <div className='logout_box' onClick={handleLogOut}>
                    <LogoutIcon className='logout_icon'/>
                    Logout
                </div>
            </div>
        </Toolbar>
    </AppBar>
  )
}

export default Nav