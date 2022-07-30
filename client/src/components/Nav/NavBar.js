import React, {useState, useEffect} from 'react';
import './NavBar.scss';
import SideBar from './SideBar/SideBar';
import {Button, Modal, Form} from 'react-bootstrap';
import {NavLink, useNavigate} from 'react-router-dom'
import { Autocomplete, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import logoImg from '../../img/MedLogo.png';
import Selector from './Select';
import {useStateValue } from '../../Reducer/StateProvider';
import {useTranslation} from 'react-i18next'
import ProfileMenu from './ProfileMenu';

function NavBar({items}) {
  const navigate = useNavigate();

  const {t} = useTranslation();
  const [{cart, user, socket, lang}, dispatch] = useStateValue();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [searchItemID, setSearchItemID] = useState('');

  useEffect(() => {

    if(!socket) return null;

    if(Object.keys(user).length!==0){
      socket.emit("User_Online", user._id);
    }

    return()=>{
      socket.disconnect();
    }
  }, [socket, user])

  const handleModalShow = () => setModalShow(true);

  const handleModalClose = () => {
    setModalShow(false);
    setSearchItemID('');
  }

  const handleSwitch=()=> setOpenSidebar(true);

  const handleLogOut =()=>{
    dispatch({
      type:"LOG_OUT"
    })
  }

  const goToCart = () => navigate('../cart')

  const handleSearchItem=async()=> {

    if(searchItemID!==""){
      await navigate(`./product/${searchItemID}`)
      handleModalClose();
    }

  }

  return (
    <div className='nav_wrapper'>
      <section className='logo_section'>
        <img src={logoImg} alt=""/>
      </section>
      <section className='menu_section'>
        <div className='subMenu_list'>
          <div className="shop_info">
            <span className='sub_menu'><LocalPhoneIcon className='sub_menu_icon'/> Phone: (+856) 12231 222 11</span>
            <span className='sub_menu'><AccessAlarmIcon className='sub_menu_icon'/> Mon-Fri (8am - 6pm)</span>
            <span className='sub_menu'><MailOutlineIcon className='sub_menu_icon'/> Email@gmail.com</span>
          </div>

          <Selector/>

          <div className='cart_box' onClick={goToCart}>
            <ShoppingCartIcon className='cart_icon'/>
            <span className='cart_number'>
              {cart.reduce((count, curItem) => {
                return count + curItem.quantity;
              }, 0)}
            </span>
          </div>
           
          {/* search box only for phone size */}
          <div className='tablet_search_box' onClick={handleModalShow}>
            <SearchIcon className='tablet_search_icon'/>
          </div>

          {/* only for phone size */}
          <div className='bar_icon' onClick={handleSwitch}>
            <MenuOpenSharpIcon/>
          </div>

        </div>

        <div className='menu_list'>
          <ul>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/">
              <li>{t('Home.nav.list1')} <AddIcon className='plus_icon'/> </li>
            </NavLink>

            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/product/discover">
              <li>{t('Home.nav.list2')} <AddIcon className='plus_icon'/></li>
            </NavLink>

            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/order_list">
              <li>{t('Home.nav.list3')} <AddIcon className='plus_icon'/></li>
            </NavLink>

            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/about">
              <li>{t('Home.nav.list4')} <AddIcon className='plus_icon'/></li>
            </NavLink>
          </ul>

          <Button variant='primary mx-4 py-1 px-2 ' className='main_search_btn' onClick={handleModalShow}>
            <SearchIcon/>
          </Button>
          
          <ProfileMenu user={user} handleLogOut={handleLogOut}/>

        </div>
      </section>

      {/* sidebar only for phone size */}
      {openSidebar&&
        <SideBar click={()=>setOpenSidebar(false)}/>
      }

      {/* search Modal */}
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header >
          <Form className='search_form'>
            <Form.Group>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(e, value)=>{
                  setSearchItemID(value.id)
                }}
                options={items.map(item=>({id:item._id, label:item.name[lang]}))}
                renderInput={(params) => <TextField {...params} label="Medicines" />}
              />
            </Form.Group> 
          </Form>
          <Button onClick={handleSearchItem} className='search_form_btn mx-1 py-3'>
            <SearchIcon/>
          </Button>
        </Modal.Header>
      </Modal>
      
    </div>
  )
}

export default NavBar