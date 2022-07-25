import React from 'react'
import {Divider, List, ListSubheader, Toolbar} from '@mui/material'
import {MenuData} from './MenuData'
import MenuList from './MenuList';
import {useLocalStorage} from '../../context/useLocalStorage'

function Menu() {

    const [activeMainMenu, setActiveMainMenu] = useLocalStorage("MainMenu", 0)

  return (
    <div style={{background:"#242D37", height:"100%"}}>
        <Toolbar sx={{borderBottom:"1px solid #ddd"}}/>
        <Divider/>
        <List
            sx={{ width: '100%', maxWidth: 360}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
            <ListSubheader component="div" id="nested-list-subheader" sx={{bgcolor:"#242D37", color:"white"}}>
                Navigation
            </ListSubheader>
            }
        >
            {MenuData.map((menu, i)=>{
                return( <MenuList menu={menu} key={i} activeMainMenu={activeMainMenu} setActiveMainMenu={setActiveMainMenu}/> )
            })}
        </List>
    </div>
  )
}

export default Menu