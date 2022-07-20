import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './locale/i18n';
import axios from 'axios';
import {Routes, Route} from 'react-router-dom';
import GridLoader from "react-spinners/GridLoader";
import Home from './components/Home/Home';
import ProductList from './components/Products/ProductList';
import Product from './components/Products/Product';
import Cart from './components/Cart/Cart';
import Payment from './components/Payment/Payment'
import User from './components/User/User';
import NavBar from './components/Nav/NavBar';
import OrderList from './components/OrderList/OrderList';
import { useLocalStorage } from './Reducer/useLocalStorage';
import { useStateValue } from './Reducer/StateProvider';

function App() {

  const [items, setItems] = useLocalStorage('Items', []);
  const [loading, setLoading] = useState(true);
  const [{language}] = useStateValue();
  const [font, setFont] = useState();

  useEffect(() => {
    const source = axios.CancelToken.source()

    const fetchItems =async()=>{
      try {
        await axios.get('https://fakestoreapi.com/products/', {cancelToken:source.token})
        .then(res=>{
          setItems(res.data);
          setLoading(false);
        });

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
  }, [setItems])

  useEffect(() => {
   if(language==="en") setFont("Times New Roman");
   if(language==="la") setFont("Phetsarath OT");
  }, [language])
  

  return (
      <div style={{fontFamily:`${font} !important`}}>
        {
          !items.length > 0 ?
          <div className='spinner_box'>
            <GridLoader loading={loading} color={'lightblue'} size={30} margin={3} />
          </div> :
          <>
            <NavBar/>
            <main>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/product/discover" element={<ProductList/>}/>
                <Route path="/product/:productId" element={<Product/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/cart/payment/:total" element={<Payment/>}/>
                <Route path="/order_list" element={<OrderList/>}/>
                <Route path="/user" element={<User/>}/>
              </Routes>
            </main>
          </>
        }
      </div>
  )
}

export default App