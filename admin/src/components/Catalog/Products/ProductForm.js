import React, {useState, useEffect}  from 'react'
import axios from '../../axios'
import {Button, Row, Col, Modal, Form} from 'react-bootstrap'
import {List, ListItem , ListItemAvatar, Stack, ListItemText, Collapse, Typography, Paper, TablePagination, Avatar, Divider, Rating} from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      textTransform:"capitalize"
    },
    children: name.charAt(0),
  };
}

function ProductForm({showModal, handleClose, handleObjectChange, handleOnChange, handleBtnSubmit, productInfo}) {

  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openReview, setOpenReview] = useState(false);

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

  useEffect(() => {
    const fetchReview=async()=>{
      await axios.post('/review/get/all-review', {reviewTo:productInfo._id})
      .then(res=>{
        setReviews(res.data.data)
      })
      .catch(err=>{
          console.log(err);
      })
    }
    fetchReview()
  }, [productInfo])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };
  
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
              <Form.Select name="type" onChange={handleObjectChange} defaultValue={"default"}>
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

          <Paper variant='outlined' sx={{mt:5, p:3}}>
            <Stack direction="rows" alignItems="center" justifyContent="space-between" onClick={()=>setOpenReview(!openReview)}>
              <Typography variant="h4" component="div">
                Reviews 
              </Typography>
              {openReview ? <ExpandLess /> : <ExpandMore />} 
            </Stack>

            <Divider/>
            <Collapse in={openReview} timeout="auto" unmountOnExit>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

                  {(rowsPerPage > 0
                      ? reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : reviews
                  ).map((row) => (
                      <div key={row.name}>
                      <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                              <Avatar {...stringAvatar(row.name)}/>
                          </ListItemAvatar>
                          <ListItemText
                          primary={row.name}
                          secondary={
                              <React.Fragment>
                                  <Rating value={row.value}/> <br/>
                                  <Typography variant='span'>
                                    {row.des}
                                  </Typography>
                              </React.Fragment>
                          }/>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                      </div>
                  ))}
              </List>
            </Collapse>   

            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={reviews.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={handleBtnSubmit}> Save </Button> 
        </Modal.Footer>
      </Modal>
  )
}

export default ProductForm