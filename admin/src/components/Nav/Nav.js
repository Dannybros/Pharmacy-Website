import React, {useState} from 'react'
import './Nav.scss'
import { Dropdown, Offcanvas } from 'react-bootstrap'
import logo from '../../img/MedLogo.png'
import avatar from '../../img/avatar.png'
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../Sidebar/Sidebar'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Nav() {

    const [canvasShow, setCanvasShow] = useState(false);

    const handleClose = () => setCanvasShow(false);
    const handleShow = () => setCanvasShow(true);

  return (
    <div className='nav'>
        <img src={logo} className="logo_img" alt="logo_img"/>
        <MenuIcon className='tablet_menu_icon' onClick={handleShow}/>
        <div className='nav-bar'>
            <Dropdown className='user_box' >
                <Dropdown.Toggle className='user_box_header'>
                    <img src={avatar} alt="user_avatar"/>
                    &nbsp;&nbsp;&nbsp; Demo demo &nbsp;
                </Dropdown.Toggle>
                
                <Dropdown.Menu className='user_box_menu'>
                    <Dropdown.Item>
                        <AccountBoxIcon className='profile_icon'/> &nbsp; Your Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        ID: &nbsp;<b>James Rodes</b>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Name: &nbsp;<b>James Rodes</b>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        Password: &nbsp;<b>adfasdfa</b>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div className='logout_box'>
                <LogoutIcon className='logout_icon'/>
                Logout
            </div>
        </div>

        <Offcanvas show={canvasShow} onHide={handleClose} style={{width:"260px"}}>
            <Sidebar setCanvasShow={setCanvasShow}/>
        </Offcanvas>
    </div>
  )
}

export default Nav