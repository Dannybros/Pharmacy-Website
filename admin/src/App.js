import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import Organize from './components/Organize/Organize'
import Import from './components/Import/Import'
import OrderList from './components/OrderList/OrderList'
import Report from './components/Report/Report'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/organize" element={<Organize/>}/>
        <Route path="/import-product" element={<Import/>}/>
        <Route path="/order_product-list" element={<OrderList/>}/>
        <Route path="/report" element={<Report/>}/>
      </Routes>
    </div>
  );
}

export default App;
