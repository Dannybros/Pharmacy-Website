import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Nav from './components/Nav/Nav';
import ProductLIst from './components/Products/ProductList';
import Product from './components/Products/Product';
import Cart from './components/Cart/Cart';
import Payment from './components/Payment/Payment'
import Contact from './components/Contact/Contact'

function App() {
  return (
    <div style={{fontFamily:"Oswald"}}>
        <Nav/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/product/discover" element={<ProductLIst/>}/>
          <Route path="/product/:productId" element={<Product/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/cart/payment" element={<Payment/>}/>
          <Route path="/about-us" element={<Contact/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App