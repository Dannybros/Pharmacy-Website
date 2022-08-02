import React, {useState} from 'react'
import './MenuList.scss'
import { useNavigate } from 'react-router-dom';
import {List, ListItemButton, ListItemText, ListItemIcon, Collapse} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useLocalStorage } from '../../context/useLocalStorage';
import { useStateValue } from '../../context/StateProvider';
import jwt_decode from "jwt-decode";

function MenuList({menu, activeMainMenu, setActiveMainMenu}) {
  
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useLocalStorage("SubMenu", null);
  const [{user}, dispatch] = useStateValue();
  const admin = user? jwt_decode(user) : user

  const handleClickMainMenu = () => {
    if(menu.submenu) setOpen(!open)
    else {
      navigate(menu.path);
      setActiveMainMenu(menu.menuValue)
    }  
  };

  const handleClickSubMenu=(submenu)=>{
    navigate(submenu.path)
    setActiveMainMenu(menu.menuValue)
    setActiveSubMenu(submenu.subValue)
  }

  return (
    <React.Fragment>
      {(menu.access || admin?.id==="admin") &&

        <ListItemButton onClick={handleClickMainMenu} className={activeMainMenu===menu.menuValue? "menu active" : "menu"} sx={{background:"#242D37", color:"#b3cbdd"}}>
            <ListItemIcon sx={{transform: "scale(0.8)"}}>
              {menu.icon}
            </ListItemIcon>
            <ListItemText primary={menu.title} />
            {menu.submenu? open ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItemButton>
      }

      <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className='subMenu'>
          {menu.submenu&&
            menu.submenu.map((submenu, i)=>{
             return (submenu.access || admin?.id==="admin") &&
              (
                  <ListItemButton sx={{ pl: 4 }} key={i} onClick={()=>handleClickSubMenu(submenu)} className={activeMainMenu===menu.menuValue&& activeSubMenu===submenu.subValue? "subMenu active" : "subMenu"}>
                    <ListItemIcon  sx={{color:'white' }}>
                        <KeyboardDoubleArrowRightIcon />
                    </ListItemIcon>
                    <ListItemText primary={submenu.title} />
                  </ListItemButton>
              )
            })
          }
        </List>
      </Collapse>

    </React.Fragment>
  )
}

export default MenuList