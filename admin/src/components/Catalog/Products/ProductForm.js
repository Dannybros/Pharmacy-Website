import React, {useState, useEffect} from 'react'
import axios from '../../axios'
import {Button, Row, Col, Modal, Form} from 'react-bootstrap'

function ProductForm({showModal, handleClose, handleObjectChange, handleOnChange, handleBtnSubmit, productInfo}) {

  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchCategory= async()=>{
      await axios.get('/category')
      .then(res=>{
        setCategories(res.data)
      })
      .catch(err=>alert(err))
    }

    fetchCategory();
  }, [])

  return (
    <Modal show={showModal} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details {productInfo.expire}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Name (EN):</label>
              <input type="text" className='form-control' name='name.en' value={productInfo.name.en} onChange={handleObjectChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Name (LAO):</label>
              <input type="text" className='form-control' name='name.la' value={productInfo.name.la} onChange={handleObjectChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Type:</label> <br/>
              <Form.Select name="type" onChange={handleObjectChange} defaultValue={productInfo.type.en!==""? productInfo.type.en + "_" + productInfo.type.la : "default"}>
                <option disabled value={"default"}> -- select an option -- </option>
                {categories.length>0&&
                  categories.map((item, i)=>{
                    return(
                      <option value={item.Name.en + "_" + item.Name.la} key={i}>{item.Name.en}</option>
                    )
                  })
                }
              </Form.Select>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Brand:</label>
              <input type="text" className='form-control' name='brand' value={productInfo.brand} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Size:</label>
              <input type="text" className='form-control' name='weight' value={productInfo.weight} onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product price:</label>
              <input type="text" className='form-control' name='price' value={productInfo.price} onChange={handleOnChange} 
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                    }
                }}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Amount:</label>
              <input type="text" className='form-control' name='quantity' value={productInfo.quantity} onChange={handleOnChange}
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                    }
                }}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Expiration:</label>
              <input type="date" className='form-control'  name='expireDate' value={productInfo.expireDate} onChange={handleOnChange}/>
            </Col>
            <Col sm={12} className="mb-3">
              <label className='mb-1'>Product Description (EN):</label>
              <textarea className='form-control' style={{height:'100px'}} name='description.en' value={productInfo.description.en} onChange={handleObjectChange}/>
            </Col>
            <Col sm={12} className="mb-3">
              <label className='mb-1'>Product Description (LAO):</label>
              <textarea className='form-control' style={{height:'100px'}} name='description.la' value={productInfo.description.la} onChange={handleObjectChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Product Image</label>
              <input type="file" className='form-control' name='imgFile' onChange={handleOnChange}/>
            </Col>
            <Col sm={6} className="mb-3">
              {productInfo.img&&
                <img src={productInfo.img} alt="product_image" className="img-fluid img-thumbnail" style={{minWidth:"50%"}}/>
              }
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={handleBtnSubmit}> Save </Button> 
        </Modal.Footer>
      </Modal>
  )
}

export default ProductForm