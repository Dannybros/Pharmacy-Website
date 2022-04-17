import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './ProductList.scss'
import {Container, Row, Col} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

import {CSSTransition} from 'react-transition-group';
import {ReactComponent as DropIcon} from '../../img/DropDown.svg';
import CategoryIcon from '@mui/icons-material/Category';

function ProductList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('All Products')
  const [openCatDD, setOpenCatDD] = useState(false);

  useEffect(() => {

    const source = axios.CancelToken.source()

    const fetchItems =async()=>{
      try {
        await axios.get('https://fakestoreapi.com/products', {cancelToken:source.token})
        .then(res=>setItems(res.data));

      } catch (error) {

        if(axios.isCancel(error)){}
        else{
          throw error
        } 
      }
    }

    fetchItems();

    return ()=>{
      source.cancel();
      
    }
  }, [items])

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

  return (
    <section className='product_list_section'>
      <Container>
        <Row>
          <div className='category_box'>
            <h1>Category</h1>
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
                        <span>{item.price} $</span>
                        <span>
                          {Array(Math.round(item.rating.rate)).fill().map((_,i)=>(
                              <b key={i}>⭐</b>
                          ))}
                      </span>
                      </p>
                      <div className='d-flex justify-content-between'>
                        <button onClick={()=>navigate('../product/test')}> View </button>
                        <button> Add Cart </button>
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