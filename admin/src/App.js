import React from 'react'
import './App.scss';
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './Protected.Route';
//
import SignIn from './components/SignIn/SignIn';
//
import Nav from './components/Nav/Nav'
//
import Sidebar from './components/Sidebar/Sidebar';
//
import Home from './components/Home/Home';
//
import OrderList from './components/OrderList/OrderList'
import OrderReport from './components/OrderList/OrderReport'
//
import Categories from './components/Catalog/Categories/Categories'
import Products from './components/Catalog/Products/Products'
import Employee from './components/Catalog/Employee/Employee';
import Supplier from './components/Catalog/Supplier/Supplier'
//
import ProductReport from './components/Report/Products/ProductReport'
import CustomerReport from './components/Report/Customers/CustomerReport'


function App() {

  return (
    <div className="App">
        <Nav/>
        <div className='d-flex web_container'>
          <Sidebar/>
          <Routes>
            <Route path="/" element={<ProtectedRoute Compo={<Home/>}/>}/>
            <Route path="/catalog/categories" element={<ProtectedRoute Compo={<Categories/>}/>}/>
            <Route path="/catalog/products" element={<ProtectedRoute Compo={<Products/>}/>}/>
            <Route path="/catalog/employees" element={<ProtectedRoute Compo={<Employee/>}/>}/>
            <Route path="/catalog/suppliers" element={<ProtectedRoute Compo={<Supplier/>}/>}/>
            <Route path="/order/:status" element={<ProtectedRoute Compo={<OrderList/>}/>}/>
            <Route path="/report/products" element={<ProtectedRoute Compo={<ProductReport/>}/>}/>
            <Route path="/report/customers" element={<ProtectedRoute Compo={<CustomerReport/>}/>}/>
            <Route path="/report/orders" element={<ProtectedRoute Compo={<OrderReport/>}/>}/>
            <Route path="/sign-in" element={<SignIn />}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
