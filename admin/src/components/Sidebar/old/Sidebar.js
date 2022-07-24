import React from 'react'
import './Sidebar.scss'
import SidebarMenu from './SidebarMenu'
import MenuIcon from '@mui/icons-material/Menu';
import {MenuData} from './MenuData'
import { useLocalStorage } from '../../context/useLocalStorage';

function Sidebar({setCanvasShow}) {

  const [activeMenu, setActiveMenu]= useLocalStorage("menu", 0);

  return (
    <div className="sidebar">
      <section className='h-100 sidebar_container'>
          <div className='p-3' style={{background:'#18212D'}}> <MenuIcon/> Navigation</div>
          <div className='link_box'>
            {
              MenuData.map((item, i)=>{
                return(
                  <SidebarMenu key={i} number={i} item={item} activeMenu={activeMenu} setActiveMenu={setActiveMenu} setCanvasShow={setCanvasShow}/>
                )
              })
            }
          </div>
      </section>
    </div>
  )
}

export default Sidebar