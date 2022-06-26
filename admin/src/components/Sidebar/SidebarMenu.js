import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import {Badge} from 'react-bootstrap'
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

function SidebarMenu({number, item, activeMenu, setActiveMenu, setCanvasShow, unread}) {
    
    const [showSubmenu, setShowSubMenu] = useState(false);

    const handleClick=()=>{
        setActiveMenu(number)
        setCanvasShow(false);
    }

    const SubMenuList=()=>{
        return(
            <div className='submenu'>
                {item?.submenu.map((menu, i)=>{
                    return(
                        <NavLink key={i} className={(navData)=>navData.isActive? 'submenu_link active' : 'submenu_link'} to={menu.path} onClick={handleClick}>
                            <li>
                                <div>
                                    <KeyboardDoubleArrowRightIcon className='submenu_icon'/> &nbsp;&nbsp;
                                    <span>{menu.title}</span>
                                </div>
                                <Badge pill bg="primary" style={{transform:'scale(0.8)'}}> 6 </Badge>
                            </li>
                        </NavLink>
                    )
                })}
            </div>
        )
    }

  return (
    <section className={activeMenu===number? 'menu_link active' : "menu_link"} key={number}>

        {item.submenu==null?

            <NavLink to={item.path} onClick={handleClick} style={{textDecoration:"none"}}>
                <li className="primary_menu">
                    <div className='link_left'>
                        <i className='menu_icon'>{item.icon}</i>
                        &nbsp; {item.title}
                    </div>  
                    
                    {unread&&   
                        <Badge pill bg="primary"  className="badge_alert"> 6 </Badge>
                    } 
                </li>
            </NavLink> :

            <li onClick={()=>setShowSubMenu(prevCheck=>!prevCheck)} className="primary_menu"> 
                <div className='link_left'>
                    <i className='menu_icon'>{item.icon}</i>
                    &nbsp; {item.title}
                </div>   

                <div className='link_right'>
                    <Badge pill bg="primary" className="badge_alert" > 6 </Badge>
                    {!showSubmenu ?
                        <ChevronRightIcon className='link_icon'/> :
                        <KeyboardArrowDownIcon className='link_icon'/>
                    }
                </div>  
            </li>
        }
        <SlideDown className={'my-dropdown-slidedown'}>
            {showSubmenu ? <SubMenuList/> : null}
        </SlideDown>    
    </section>
  )
}

export default SidebarMenu