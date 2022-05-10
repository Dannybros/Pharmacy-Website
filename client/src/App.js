import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import {StateProvider} from './Reducer/StateProvider'
// import reducer, { initialState } from './Reducer/reducer';
import reducer, { initialState } from './Reducer/reducerGroup';

import Home from './components/Home/Home';
import ProductList from './components/Products/ProductList';
import Product from './components/Products/Product';
import Cart from './components/Cart/Cart';
import Payment from './components/Payment/Payment'
import SignIn from './components/User/SignIn';
import NavBar from './components/Nav/NavBar';
import OrderList from './components/OrderList/OrderList';

function App() {

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div style={{fontFamily:"Oswald"}}>
        <NavBar/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/discover" element={<ProductList/>}/>
            <Route path="/product/:productId" element={<Product/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/cart/payment" element={<Payment/>}/>
            <Route path="/order_list" element={<OrderList/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
          </Routes>
        </main>
      </div>
    </StateProvider>
  )
}

export default App