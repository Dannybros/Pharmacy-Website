import React, {useState} from 'react'
import {CSSTransition} from 'react-transition-group';
import CategoryIcon from '@mui/icons-material/Category';
import { useStateValue } from '../../../Reducer/StateProvider';

const CategoryDropDown=({catList, setCategoryTitle})=>{
    const[activeMenu, setActiveMenu] = useState('menu');
    const [menuHeight, setMenuHeight] = useState(null);

    const [{lang}] = useStateValue();

    function calcHeight(el){
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props){
        return(
            <div 
                className="menu_item" 
                onClick={()=>{
                    !props.goToMenu && setCategoryTitle(props.value); 
                    props.goToMenu && setActiveMenu(props.goToMenu);
                }}
            >
                <span className="leftIcon icon-button" >{props.icon}</span>
                {props.children}
            </div>
        )
    }

    return(
        <div className="DropdownBox" style={{height:menuHeight}}>
            <CSSTransition
                in={activeMenu==='menu'}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <DropdownItem icon={<CategoryIcon/>} value={{en:'All Products', la:"ທັງໝົດ"}}>
                        {lang==="en"? "All Products": "ທັງໝົດ"}
                    </DropdownItem>
                    {catList?.map((cat, i)=>{
                        return(
                          <DropdownItem icon={<CategoryIcon/>} key={i} value={cat.Name}>{cat.Name[lang]}</DropdownItem>
                        )
                    })}
                </div>
            </CSSTransition>
        </div>
    )
  }

export default CategoryDropDown