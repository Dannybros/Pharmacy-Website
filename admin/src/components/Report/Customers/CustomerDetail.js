import React, {useState, useEffect} from 'react'
import {Button, Row, Col, Modal} from 'react-bootstrap'
import {Table, TableBody, TableHead, TableCell, TableRow, TableContainer, Paper, TablePagination, TableFooter } from '@mui/material'
import axios from '../../axios'
import moment from 'moment'

function CustomerDetail({addModal, handleModalClose, selectedCustomer}) {

  const [userOrders, setUserOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchProducts= async()=>{
      await axios.post('/order/user', {_id:selectedCustomer._id})
      .then(res=>{
        setUserOrders(res.data)
      })
      .catch(err=>alert(err))
    }

    fetchProducts();
  }, [selectedCustomer]) 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Modal 
        show={addModal} 
        onHide={handleModalClose} 
        animation={false} 
        size="lg" 
      >
        <Modal.Header>
          <Modal.Title>Customer Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>First Name:</label>
              <input type="text" className='form-control' value={selectedCustomer.name} disabled/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Birthday:</label>
              <input type="date" className='form-control' value={selectedCustomer.birthday} disabled/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Email:</label>
              <input type="date" className='form-control' value={selectedCustomer.email} disabled/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Username:</label>
              <input type="date" className='form-control' value={selectedCustomer.username} disabled/>
            </Col>
            <Col sm={6} className="mb-3">
              <label className='mb-1'>Hint:</label>
              <input type="text" className='form-control' value={selectedCustomer.hint} disabled/>
            </Col>
          </Row>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={3}>
                    <b>Orders ({userOrders.length})</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell align="right"><b>Date</b></TableCell>
                  <TableCell align="right"><b>Total</b></TableCell>
                  <TableCell align="right"><b>Status</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return(
                    <TableRow key={row._id}>
                      <TableCell>{row._id}</TableCell>
                      <TableCell align="right">{moment(row.createdAt).format("MM/DD/YYYY__hh:mm")}</TableCell>
                      <TableCell align="right">{row.orderTotal}</TableCell>
                      <TableCell align="right">{row.status.en}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              <TableFooter sx={{display:"flex", alignItems:'center'}}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  count={userOrders.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableFooter>
            </Table>
          </TableContainer>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}> Close </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default CustomerDetail