import React from 'react'
import './Sidebar.scss'
import CloseIcon from '@mui/icons-material/Close';
import {NavLink, useNavigate} from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import {Button} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function SideBar(props) {
    
    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
        <div className='col-12 sidebar_page'>
            <div className='dark-light_Bg' onClick={props.click}/>
            <main className='col-xs-12 col-sm-4 side-bar'>
                <CloseIcon className="closing_icon" onClick={props.click}/>
                <div className='user_info_box'>
                    <PersonOutlineIcon className='user__icon'/>
                    <div className='user__info'>
                        <span className='user__info__name'><b>{t('Home.nav.guest')} </b></span>
                        <div className='user__info__email'><b>Email : None</b></div>
                    </div>
                    <Button className='mx-4 py-1 px-3 btn_log_in' onClick={()=>navigate('../user')}>
                        {t('Sidebar.login')}
                    </Button>
                    <Button className='mx-4 py-1 px-3 btn_sign_out' variant="danger">
                        <LogoutIcon/>
                    </Button>
                </div>
                <div className='d-flex links_box'>
                    <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={props.click} to="/">
                        <li> {t('Home.nav.list1')}  </li>
                    </NavLink>

                    <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={props.click} to="/product/discover">
                        <li> {t('Home.nav.list2')}  </li>
                    </NavLink>
                    
                    <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={props.click} to="/cart">
                        <li> {t('Sidebar.list5')}  </li>
                    </NavLink>

                    <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={props.click} to="/about">
                        <li> {t('Home.nav.list4')}  </li>
                    </NavLink>

                    <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } onClick={props.click} to="/order_list">
                        <li> {t('Home.nav.list3')}  </li>
                    </NavLink>
                    
                </div>
            </main>
        </div>
    )
}

export default SideBar