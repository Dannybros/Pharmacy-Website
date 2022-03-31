import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import ProductLIst from './components/Products/ProductList';
import Product from './components/Products/Product';
import Cart from './components/Cart/Cart';
import Payment from './components/Payment/Payment'
import Contact from './components/Contact/Contact'
import SignIn from './components/User/SIgnIn';
import NavBar from './components/Nav/NavBar';

function App() {
  return (
    <div style={{fontFamily:"Oswald"}}>
      <NavBar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/product/discover" element={<ProductLIst/>}/>
          <Route path="/product/:productId" element={<Product/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/cart/payment" element={<Payment/>}/>
          <Route path="/about-us" element={<Contact/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App