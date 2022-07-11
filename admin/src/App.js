import './App.scss';
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav/Nav'
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import Import from './components/Imports/Import/Import'
import ImportList from './components/Imports/ImportList/ImportList'
import PendingList from './components/OrderList/Pending/PendingList'
import DeliveryList from './components/OrderList/Delivery/Delivery';
import Categories from './components/Catalog/Categories/Categories'
import Products from './components/Catalog/Products/Products'
import Employee from './components/Catalog/Employee/Employee';
import Supplier from './components/Catalog/Supplier/Supplier'
import ProductReport from './components/Report/Products/ProductReport'
import CustomerReport from './components/Report/Customers/CustomerReport'
import ImportReport from './components/Report/Imports/ImportReport'
import OrderReport from './components/Report/Orders/OrderReport'
import Setting from './components/Setting/Setting'

function App() {
  return (
    <div className="App">
      <Nav/>
      <div className='d-flex web_container'>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/catalog/categories" element={<Categories/>}/>
          <Route path="/catalog/products" element={<Products/>}/>
          <Route path="/catalog/employees" element={<Employee/>}/>
          <Route path="/catalog/suppliers" element={<Supplier/>}/>
          <Route path="/imports" element={<Import/>}/>
          <Route path="/imports/orders" element={<ImportList/>}/>
          <Route path="/order/pending" element={<PendingList/>}/>
          <Route path="/order/delivery" element={<DeliveryList/>}/>
          <Route path="/report/products" element={<ProductReport/>}/>
          <Route path="/report/customers" element={<CustomerReport/>}/>
          <Route path="/report/imports" element={<ImportReport/>}/>
          <Route path="/report/orders" element={<OrderReport/>}/>
          <Route path="/setting" element={<Setting/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
