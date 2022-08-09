import React, {useState, useEffect} from 'react'
import './ProductList.scss'
import {Container, Row, Toast} from 'react-bootstrap'
import {ReactComponent as DropIcon} from '../../../img/DropDown.svg';
import axios from '../../axios/axios';
import CategoryDropDown from './ProductCategory';
import ProductGrid from './ProductGrid';
import { useStateValue } from '../../../Reducer/StateProvider';
import {useTranslation} from 'react-i18next'

function ProductList() {
  const [{socket}] = useStateValue();
  const [items, setItems] = useState([]);
  const [catList, setCatList] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState({en:'All Products', la:"ທັງໝົດ"})
  const [openCatDD, setOpenCatDD] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    const fetchItems =async()=>{
      await axios.get('/products')
      .then(res=>setItems(res.data))
    }

    fetchItems();
  }, [])

  useEffect(() => {
    const fetchCat =async()=>{
      await axios.get('/category')
      .then(res=>setCatList(res.data))
    }

    fetchCat();
  }, [])

  useEffect(() => {
    
    socket.on("new-products", (data)=>{
      setItems(oldArray => [...oldArray, data.data]);
    })

    socket.on("update-product", (data)=>{
      const updatedItem = data.data;
      setItems(oldItems=>{
        return oldItems.map(item => {
          return item._id === updatedItem._id ? { ...updatedItem} : item
        })
      })
    })

    socket.on("delete-product", (data)=>{
      setItems((items)=>{return items.filter((obj)=>obj._id!==data.id)});
    })
  }, [socket])

  const filterItems=(products)=>{
      let temProducts = products;
      if(categoryTitle.en!=="All Products"){
          temProducts = products.filter((i)=>{return i.type.en===categoryTitle.en});
          return temProducts
      }else{
          return products
      }
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
            <strong className="me-auto" style={{color:'#BB2D3B'}}> {t('Shop.alert')} </strong>
          </Toast.Header>
          <Toast.Body><b style={{color:"#BB2D3B", fontSize:"16px"}}> {t('Shop.alertDes')} </b></Toast.Body>
        </Toast>

        <Row>
          <div className='category_box'>
            <h1 onClick={()=>setShowToast(true)}> {t('Shop.title')} </h1>
            <div className="DropDown">
                <div className="category__dropdown__icon icon-button" onClick={()=>setOpenCatDD(!openCatDD)}>
                    {<DropIcon/>}
                </div>
                {openCatDD && <CategoryDropDown catList={catList} setCategoryTitle={setCategoryTitle}/>}
            </div>
          </div>
          <ProductGrid data={filterItems(items)}/>
          
        </Row>
      </Container>
    </section>
  )
}

export default ProductList