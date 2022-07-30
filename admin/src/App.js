import React from 'react'
import './App.scss';
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import ProtectedRoute from './Protected.Route';
//
import SignIn from './components/SignIn/SignIn';
//
import Nav from './components/Nav/Nav'
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
import ImportList from './components/Imports/ImportList/ImportList';
import SideBar from './components/Sidebar/Drawer';
import Import from './components/Imports/Import/Import';
import ImportReport from './components/Report/Imports/ImportReport';

const drawerWidth = 240;

function App(props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Nav handleDrawerToggle={handleDrawerToggle}/>

      <SideBar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} container={container}/>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar/>
        <Routes>
          <Route path="/" element={<ProtectedRoute Compo={<Home/>}/>}/>
          <Route path="/catalog/categories" element={<ProtectedRoute Compo={<Categories/>}/>}/>
          <Route path="/catalog/products" element={<ProtectedRoute Compo={<Products/>}/>}/>
          <Route path="/catalog/employees" element={<ProtectedRoute Compo={<Employee/>}/>}/>
          <Route path="/catalog/suppliers" element={<ProtectedRoute Compo={<Supplier/>}/>}/>
          <Route path="/order/:status" element={<ProtectedRoute Compo={<OrderList/>}/>}/>
          <Route path="/imports/pending" element={<ProtectedRoute Compo={<ImportList/>}/>}/>
          <Route path="/import/order" element={<ProtectedRoute Compo={<Import/>}/>}/>
          <Route path="/report/products" element={<ProtectedRoute Compo={<ProductReport/>}/>}/>
          <Route path="/report/imports" element={<ProtectedRoute Compo={<ImportReport/>}/>}/>
          <Route path="/report/customers" element={<ProtectedRoute Compo={<CustomerReport/>}/>}/>
          <Route path="/report/orders" element={<ProtectedRoute Compo={<OrderReport/>}/>}/>
          <Route path="/sign-in" element={<SignIn />}/>
        </Routes>
      </Box>
    </Box>
  );
}

export default App;