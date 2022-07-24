import React, {useState} from 'react'
import './MenuList.scss'
import { useNavigate } from 'react-router-dom';
import {List, ListItemButton, ListItemText, ListItemIcon, Collapse} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

function MenuList({menu}) {
  
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickMainMenu = () => {
    
    if(menu.submenu) setOpen(!open)
    else navigate(menu.path)
  };

  const handleClickSubMenu=(path)=>{
    navigate(path)
  }

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClickMainMenu} className="menu" sx={{background:"#242D37", color:"#b3cbdd"}}>
          <ListItemIcon sx={{transform: "scale(0.8)"}}>
            {menu.icon}
          </ListItemIcon>
          <ListItemText primary={menu.title} />
          {menu.submenu? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItemButton>

    <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className='subMenu'>
        {menu.submenu&&
          menu.submenu.map((submenu, i)=>(
            <ListItemButton sx={{ pl: 4 }} key={i} onClick={()=>handleClickSubMenu(submenu.path)} className="submenu_list">
              <ListItemIcon  sx={{color:'white' }}>
                  <KeyboardDoubleArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary={submenu.title} />
            </ListItemButton>
          ))
        }
      </List>
    </Collapse>

    </React.Fragment>
  )
}

export default MenuList