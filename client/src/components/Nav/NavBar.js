import React, {useState} from 'react';
import './NavBar.scss';
import SideBar from './SideBar/SideBar';
import {Button, Modal, Form} from 'react-bootstrap';
import {NavLink, useNavigate} from 'react-router-dom'
import {useStateValue } from '../../Reducer/StateProvider';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';

function NavBar() {
  const navigate = useNavigate();

  const [cart, dispatch] = useStateValue();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [searchSelected, setSearchSelected] = useState([]);

  const handleModalClose = () => {
    setModalShow(false);
    setSearchSelected([]);
  }

  const handleModalShow = () => setModalShow(true);

  const handleSwitch=()=> setOpenSidebar(true);

  const goToCart = () => navigate('../cart')

  const d = [{name:"dd", email:"23"},{name:"aad", email:"54"}]

  return (
    <div className='nav_wrapper'>
      <section className='logo_section'>
        adfa
      </section>
      <section className='menu_section'>
        <div className='subMenu_list'>
          <div className="shop_info">
            <span className='sub_menu'><LocalPhoneIcon className='sub_menu_icon'/> Phone: (+856) 12231 222 11</span>
            <span className='sub_menu'><AccessAlarmIcon className='sub_menu_icon'/> Mon-Fro (8am - 6pm)</span>
            <span className='sub_menu'><MailOutlineIcon className='sub_menu_icon'/> adfadssasdssdsfa@gmail.com</span>
          </div>

          {/* only for phone size */}
          <select className='currency_tablet_selector'>
            <option value="">USD</option>
            <option value="">KIP</option>
          </select>
          {/* end of phone size*/}

          <select className='lang_selector'>
            <option value="">Eng</option>
            <option value="">Lao</option>
          </select>
          
          {/* only for phone size */}
          <div className='tablet_search_box' onClick={handleModalShow}>
            <SearchIcon className='tablet_search_icon'/>
            Search
          </div>
          {/* end of phone size*/}
          
          <div className='cart_box' onClick={goToCart}>
            <ShoppingCartIcon className='cart_icon'/>
            <span className='cart_number'>{cart? cart.length: 0}</span>
          </div>

          {/* only for phone size */}
          <div className='bar_icon' onClick={handleSwitch}>
            <MenuOpenSharpIcon/>
          </div>
          {/* end of phone size*/}

        </div>

        <div className='menu_list'>
          <ul>
            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/">
              <li>Home <AddIcon className='plus_icon'/> </li>
            </NavLink>

            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/product/discover">
              <li>Shop <AddIcon className='plus_icon'/></li>
            </NavLink>

            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/order_history">
              <li>Order History <AddIcon className='plus_icon'/></li>
            </NavLink>

            <NavLink className={(navData)=>navData.isActive? 'nav_link active' : 'nav_link' } to="/sign-in">
              <li>Sign In <AddIcon className='plus_icon'/></li>
            </NavLink>
          </ul>

          <div className='currency_selector'>
            <select name="" id="">
              <option value="">USD</option>
              <option value="">KIP</option>
            </select>
          </div>

          <Button variant='primary mx-2 py-1 px-2 ' className='main_search_btn' onClick={handleModalShow}>
            <SearchIcon/>
          </Button>

          <div className='user_box'>
            <div className='user_name_box'>
              <PersonOutlineIcon className='user_icon'/>
              Guest
            </div>
            <p>Email : None</p>
          </div>

        </div>
      </section>

      {/* sidebar only for phone size */}
      {openSidebar&&
        <SideBar click={()=>setOpenSidebar(false)}/>
      }

      {/* search Modal */}
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton >
          <Form className='search_form'>
            <Form.Group>
              <Typeahead
                id="search-type_ahead"
                labelKey="name"
                onChange={setSearchSelected}
                options={d.map(item=>{return item.email;})}
                placeholder="Search Item..."
                selected={searchSelected}
              />
            </Form.Group>
          </Form>
          <Button type="submit" className='search_form_btn'>
            <SearchIcon/>
          </Button>
        </Modal.Header>
      </Modal>
      
    </div>
  )
}

export default NavBar