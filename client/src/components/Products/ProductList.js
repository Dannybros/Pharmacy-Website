import React, {useState} from 'react'
import './ProductList.scss'
import {Container, Row, Col, Toast} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

import {CSSTransition} from 'react-transition-group';
import {ReactComponent as DropIcon} from '../../img/DropDown.svg';
import CategoryIcon from '@mui/icons-material/Category';
import { useLocalStorage } from '../../Reducer/useLocalStorage';
import { useStateValue } from '../../Reducer/StateProvider';

function ProductList() {
  const navigate = useNavigate();
  const [items] = useLocalStorage('Items');
  const [exchangeRate] = useLocalStorage("ExchangeRate")
  const [{cart, currency}, dispatch] = useStateValue();

  const [categoryTitle, setCategoryTitle] = useState('All Products')
  const [openCatDD, setOpenCatDD] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function checkItemInCart(id){
    const index = cart.findIndex(prod => prod.id === id);
    if(index <0) return false
    return true
  }
  
  const getItemsUnderCategory=(arr, index) =>{

    const unique = arr
        .map(e => e[index])

        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)

        // eliminate the dead keys & store unique objects
        .filter(e => arr[e]).map(e => arr[e]);      

    return unique;
  }

  const CategoryDropDown=(props)=>{
    const[activeMenu, setActiveMenu] = useState('menu');
    const [menuHeight, setMenuHeight] = useState(null);
    
    const cartList = getItemsUnderCategory(props.item, "category");

    function calcHeight(el){
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props){
        return(
            <div 
                className="menu_item" 
                onClick={()=>{
                    !props.goToMenu && setCategoryTitle(props.children); 
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
                  <DropdownItem icon={<CategoryIcon/>}>All Products</DropdownItem>
                    {cartList.map((i)=>{
                        return(
                            <DropdownItem icon={<CategoryIcon/>} key ={i.category}>{i.category}</DropdownItem>
                        )
                    })}
                </div>
            </CSSTransition>
        </div>
    )
  }

  const filterItems=(products)=>{
      let temProducts = products;
      if(categoryTitle!=="All Products"){
          temProducts = products.filter((i)=>{return i.category===categoryTitle});
          return temProducts
      }else{
          return products
      }
  }

  const AddToCart =(data)=>{
    if(checkItemInCart(data.id)){
      setShowToast(true)
    }else{
      dispatch({
        type:"ADD_TO_BASKET",
        item: data,
      });
    }
  }

  const getExchangeRatePrice = (price)=>{
    if(currency.abbr==="USD"){
      const newPrice = price / exchangeRate.rates.LAK;
      return Math.round(newPrice).toLocaleString();
    }

    return (Math.round(price/1000)*1000).toLocaleString();
  }

  return (
    <section className='product_list_section'>
      <Container>
        <Toast style={{position:'absolute',top:"100px", right:"0"}} onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded "
              alt=""
            />
            <strong className="me-auto" style={{color:'#BB2D3B'}}>Alert</strong>
          </Toast.Header>
          <Toast.Body><b style={{color:"#BB2D3B", fontSize:"16px"}}>You already have this Item on the Cart!</b></Toast.Body>
        </Toast>

        <Row>
          <div className='category_box'>
            <h1 onClick={()=>setShowToast(true)}>Category</h1>
            <div className="DropDown">
                <div className="category__dropdown__icon icon-button" onClick={()=>setOpenCatDD(!openCatDD)}>
                    {<DropIcon/>}
                </div>
                {openCatDD && <CategoryDropDown item={items}/>}
            </div>
           
          </div>
          {
            filterItems(items).map((item, i)=>{
              return(
                <Col lg={3} md={4} sm={6} xs={6} className="product_item_box" key={i}>
                  <div className='product'>
                    <img src={item.image} alt=""/>
                    <div className='product_info_box'>
                      <h4>{item.title}</h4>
                      <p>
                        <span>{getExchangeRatePrice(item.price * 12342)} {currency.abbr}</span>
                        <span>
                          {Array(Math.round(item.rating.rate)).fill().map((_,i)=>(
                              <b key={i}>⭐</b>
                          ))}
                        </span>
                      </p>
                      <div className='d-flex justify-content-between'>
                        <button onClick={()=>navigate(`../product/${item.id}`)}> View </button>
                        <button onClick={()=>AddToCart(item)} style={{background:checkItemInCart(item.id)? "#135118": "#4caf50"}}> Add Cart </button>
                      </div>
                    </div>
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </section>
  )
}

export default ProductList