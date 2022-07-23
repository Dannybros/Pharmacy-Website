import React, {useState, useEffect} from 'react'
import './Products.scss'
import ProductForm from './ProductForm';
import { v4 as uuidv4 } from 'uuid';
import {Card, Button, Col} from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Swal from 'sweetalert2'
import io from 'socket.io-client';
import axios from '../../axios'
import { storage } from '../../firebaseConfig';
import {ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import ProductList from './ProductList';

const initialProductInfo = {name:{en:"", la:""}, type:{en:"", la:""}, price:"", brand:"", weight:"", quantity:"", description:{en:"", la:""}, expireDate:"", imgFile:null, img:""};

function Products() {

  const [socket, setSocket] = useState();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState();
  const [showModal, setShowModal] = useState(false);
  const [productInfo, setProductInfo] = useState(initialProductInfo);
  const [selectedItem, setSelectedItem] = useState(false);
  
  useEffect(() => {
    const fetchProducts= async()=>{
      await axios.get('/products')
      .then(res=>{
        setProducts(res.data)
      })
      .catch(err=>alert(err))
    }

    fetchProducts();
  }, [])
  
  useEffect(() => {
    const s = io.connect("http://localhost:5000");
    setSocket(s);
  
    return () => {
      s.disconnect();
    }
  }, [])
  
  useEffect(() => {
    if (socket==null) return

    socket.on("update-several-product", (data)=>{
      setProducts(data.data)
    })
    
    socket.on("new-products", (data)=>{
      setProducts(oldArray => [...oldArray, data.data]);
    })

    socket.on("receive_message", (data)=>{
      alert(data.message);
    })

    socket.on("delete-product", (data)=>{
      setProducts((items)=>{return items.filter((item)=>item._id!==data.id)});
    })
    
    socket.on("update-product", (data)=>{
      const updatedItem = data.data;
      setProducts(oldItems=>{
        return oldItems.map(item => {
          return item._id === updatedItem._id ? { ...updatedItem} : item
        })
      })
    })

  }, [socket])  

  const handleClose = () => {
    setShowModal(false);
    setSelectedItem(false);
    setProductInfo(initialProductInfo);
  };

  const handleShow = (item) =>{
    setShowModal(true);
    setSelectedItem(item===null? false : true);
    setProductInfo(item!==null?item : initialProductInfo);
  };

  const handleOnChange =(e)=>{
    const newObj = {...productInfo};

    if(e.target.name==="imgFile"){
      newObj["imgFile"] =e.target.files[0];
      newObj["img"] =URL.createObjectURL(e.target.files[0]);
    }else{
      newObj[e.target.name] = e.target.value;
    }
    setProductInfo(newObj)
  }

  const handleObjectChange=(e)=>{
    if(e.target.name==="type"){
      const cat_En = e.target.value.split('_')[0]
      const cat_La = e.target.value.split('_')[1]
      setProductInfo({
        ...productInfo, 
        type:{en:cat_En, la:cat_La}
      })
    }else{
      const objectName = e.target.name.split('.')[0]
      const objectKey = e.target.name.split('.')[1]
      const object = productInfo[objectName]
      setProductInfo({
          ...productInfo, 
          [objectName]:{
            ...object, 
            [objectKey]:e.target.value
          }
      })
    }
  }

  const uploadInfoToBackend=(data)=>{
    const apiURL = selectedItem? '/products/update' : '/products'

    axios.post(apiURL, data)
    .then(res=>{
      setShowModal(false);
      Swal.fire({
        title: 'success',
        text: res.data.message,
        icon: 'success',
      })
    })
    .catch((error)=>{
      // deleteObject(ref(storage, data.imgUrl))
      Swal.fire({
        title: 'error',
        text: error.response.data.message,
        icon: 'warning',
      })
    })
  }

  const handleBtnSubmit=()=>{

    if(productInfo.imgFile===null){
      Swal.fire({
        title: 'error',
        text: 'Please select image',
        icon: 'warning',
      })

    }else{
      if(productInfo.img && !productInfo.imgFile){
        let formData = {...productInfo, imgUrl:productInfo.img}
        uploadInfoToBackend(formData)
      }else{
        const imgPath = selectedItem? productInfo.img : `/product-images/${uuidv4()}`
  
        const storageRef = ref(storage, imgPath)
    
        const uploadTask = uploadBytesResumable(storageRef, productInfo.imgFile);
     
        uploadTask.on(
            "state_changed",
            (snapShot) => {
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(fireBaseUrl  => {
                  let formData = {...productInfo, imgUrl:fireBaseUrl}
                  uploadInfoToBackend(formData)
                });
            }
        ); 
      }
    }
  }
  
  const handleDelete=(item)=>{
    const id = item._id
    axios.post('/products/delete', {id:id})
      .then(res=>{
        deleteObject(ref(storage, item.img))
        Swal.fire({
          title: 'success',
          text: res.data.message,
          icon: 'success',
        })
      })
      .catch((error)=>{
        Swal.fire({
          title: 'error',
          text: error.response.data.message,
          icon: 'warning',
        })
      })
  }

  return (
    <div className='product'>
      <Card body>
        <Col className="mb-3" md={6}>
          <div className="input-group">
              <input className="form-control ml-sm-2" type="search" placeholder="Search..." onChange={(e)=>setSearch(e.target.value)}/>
              <div className="input-group-prepend">
                  <span className="input-group-text">
                  <i className="fas fa-search">@</i>
                  </span>
              </div>
          </div>
        </Col>

        <section className="card-header">
          <div className='d-flex align-items-center'>
            <FormatListBulletedIcon className='list_icon'/> &nbsp; Product List
          </div>
          <div className='d-flex align-items-center'>
            <Button className='add_icon' variant="success" name="add" onClick={()=>handleShow(null)}><AddIcon/></Button>
          </div>
        </section>

        <ProductList handleShow={handleShow} handleDelete={handleDelete} data={products} search={search}/>
      </Card>

      <ProductForm showModal={showModal} handleClose={handleClose} handleObjectChange={handleObjectChange} handleOnChange={handleOnChange} handleBtnSubmit={handleBtnSubmit} productInfo={productInfo}/>
    </div>
  )
}

export default Products