import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
