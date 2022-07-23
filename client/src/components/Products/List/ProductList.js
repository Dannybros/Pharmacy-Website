import React, {useState, useEffect} from 'react'
import './ProductList.scss'
import {Container, Row, Toast} from 'react-bootstrap'
import {ReactComponent as DropIcon} from '../../../img/DropDown.svg';
import axios from '../../axios/axios';
import CategoryDropDown from './ProductCategory';
import ProductGrid from './ProductGrid';
import { useStateValue } from '../../../Reducer/StateProvider';

function ProductList() {
  const [{socket}] = useStateValue();
  const [items, setItems] = useState([]);
  const [catList, setCatList] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState({en:'All Products', la:"ທັງໝົດ"})
  const [openCatDD, setOpenCatDD] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
  
  
  // const getItemsUnderCategory=(arr, index) =>{

  //   const unique = arr
  //       .map(e => e[index])

  //       // store the keys of the unique objects
  //       .map((e, i, final) => final.indexOf(e) === i && i)

  //       // eliminate the dead keys & store unique objects
  //       .filter(e => arr[e]).map(e => arr[e]);      

  //   return unique;
  // }

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
                {openCatDD && <CategoryDropDown catList={catList} setCategoryTitle={setCategoryTitle}/>}
            </div>
          </div>
          <ProductGrid data={filterItems(items)} setShowToast={setShowToast}/>
          
        </Row>
      </Container>
    </section>
  )
}

export default ProductList