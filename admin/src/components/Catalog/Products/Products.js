import React, {useState, useEffect} from 'react'
import './Products.scss'
import ProductForm from './ProductForm';
import { v4 as uuidv4 } from 'uuid';
import {Card, Button, Col} from 'react-bootstrap'
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {Snackbar, Alert, AlertTitle} from '@mui/material';
//import io from 'socket.io-client';
import axios from '../../axios'
import { storage } from '../../firebaseConfig';
import {ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import ProductList from './ProductList';

const initialProductInfo = {name:"", type:"", price:"", brand:"", weight:"", quantity:"", description:"", expireDate:"", imgFile:null, img:""};

function Products() {

  //const [socket, setSocket] = useState();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState();
  const [showModal, setShowModal] = useState(false);
  const [productInfo, setProductInfo] = useState(initialProductInfo);
  const [selectedItem, setSelectedItem] = useState(false);
  const [openAlert, setOpenAlert] = useState({state:false, message:"", type:'warning'});
  
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
  
  // useEffect(() => {
  //   const s = io.connect("http://localhost:5000");
  //   setSocket(s);
  
  //   return () => {
  //     s.disconnect();
  //   }
  // }, [])

  
  // useEffect(() => {
  //   if (socket==null) return
    
  //   socket.on("new-message", (data)=>{
  //     alert(data.message);
  //   })

  //   socket.on("receive_message", (data)=>{
  //     alert(data.message);
  //   })
  // }, [socket])  

  const handleCloseAlert=()=>{
    setOpenAlert({state:false, message:"", type:""});
  }

  const handleOpenAlert=(message, type)=>{
    setOpenAlert({state:true, message:message, type:type});
  }

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

  const uploadInfoToBackend=(data)=>{
    const apiURL = selectedItem? '/products/update' : '/products'

    axios.post(apiURL, data)
    .then(res=>{
      setShowModal(false);
      handleOpenAlert(res.data.message, "success");
    })
    .catch((error)=>{
      handleOpenAlert(error.response.data.message, "warning");
    })
  }

  const handleBtnSubmit=()=>{

    if(productInfo.imgFile===null){
      handleOpenAlert("Please select image", "warning");

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
  
  const handleDelete=(item)=>{
    const id = item._id
    axios.post('/products/delete', {id:id})
      .then(res=>{
        deleteObject(ref(storage, item.img))
        setProducts(products.filter(item=>item._id !==id));
        handleOpenAlert(res.data.message, "success");
      })
      .catch((error)=>{
        handleOpenAlert(error.response.data.message, "warning");
      })
  }

  const handleTest=()=>{
     //socket.emit("send_message", {message:"test"});
  }

  const handleTest2=()=>{
    //axios.post('/products/test');
  }

  return (
    <div className='product'>
      <Snackbar open={openAlert.state} autoHideDuration={2000} onClose={handleCloseAlert} anchorOrigin={{vertical: "top", horizontal: "right"}}>
        <Alert onClose={handleCloseAlert} variant="filled" severity={openAlert.type==="warning"? "warning" :"success"} sx={{ width: '100%' }} >
          <AlertTitle style={{textTransform:"capitalize"}}>{openAlert.type}</AlertTitle>
          {openAlert.message}
        </Alert>
      </Snackbar>

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

      <ProductForm showModal={showModal} handleClose={handleClose} handleOnChange={handleOnChange} handleBtnSubmit={handleBtnSubmit} productInfo={productInfo}/>
    </div>
  )
}

export default Products