import React, {useEffect, useState, Fragment} from 'react'
import {Button, Modal, Row, Col} from 'react-bootstrap'
import axios from '../axios'
import { styled } from '@mui/material/styles';
import {Divider, List, ListItem, ListItemText, TextField, Typography, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Paper, FormControl, MenuItem, Select, InputLabel} from '@mui/material'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.action.selected,
}));

function OrderDetail({data, showDetail, handleCloseDetails, handleSubmit}) {

    const [employee, setEmployee] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");

    useEffect(() => {
        const fetchEmployee= async()=>{
          await axios.get('/employee')
          .then(res=>{
            setEmployee(res.data)
          })
          .catch(err=>alert(err))
        }
    
        fetchEmployee();
      }, [])
      

      const handleChange = (event) => {
        setSelectedEmployee(event.target.value);
      };

  return (
    <Modal
        show={showDetail}
        onHide={handleCloseDetails}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Order Details Info
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Typography variant="h6" component="div">
               <b>Details</b>
            </Typography>
            <List dense={true}>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="ID"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?._id}/> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Customer" secondary="Address"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem>
                            <ListItemText 
                                primary={
                                    <Fragment> <Typography component="span" color="#757ce8"> {data?.customerName} </Typography> </Fragment>
                                } 
                                secondary="adds"
                            />
                        </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Date_Time"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.createdAt}/> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Payment Method"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.paymentMethod} /> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Total Amount"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.orderTotal} /> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Status"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.status} /> </ListItem>
                    </Col>
                </Row>
            </List>

            <Divider/>

            <Typography sx={{ mb: 2, mt:2}} variant="h6" component="div">
               <b>Order Items</b>
            </Typography>
            <TableContainer component={Paper} sx={{ mb: 4}}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Total</TableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data!==null &&
                         data.orderItems.map((item)=>{
                            return(
                                <TableRow key={item.title} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" style={{display:"flex"}}>
                                        <img className="order_detail_img" src={item.image} alt=""/>
                                        <ListItemText
                                            primary={item.title}
                                            secondary={item.id}
                                        />
                                    </TableCell>
                                    <TableCell align="center"> ${item.price}</TableCell>
                                    <TableCell align="center">{item.quantity}</TableCell>
                                    <TableCell align="center">${item.quantity * item.price}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider/>

            {data?.status==="Pending"?
            
            <FormControl sx={{mt:4,  minWidth: 400 }}>
                <InputLabel id="demo-simple-select-label">Employee Name</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedEmployee}
                label="Employee Name"
                onChange={handleChange}
                >
                {employee.map((emp)=>(
                    <MenuItem value={emp.EmployeeName} key={emp._id}>{emp.EmployeeName}</MenuItem>
                ))}
                </Select>
            </FormControl> :
            <TextField
                sx={{mt:4,  minWidth: 400 }}
                id="outlined-read-only-input"
                label="Employee Name"
                defaultValue={data?.employeeName}
                InputProps={{
                readOnly: true,
                }}
            />
            }

        </Modal.Body>

        <Modal.Footer>
          <Button variant="warning" onClick={handleCloseDetails}>Close</Button>
          <Button variant='danger'> Cancel Order </Button>
          <Button onClick={()=>handleSubmit(data._id, selectedEmployee)}>
            {data?.status==="Pending"? "Start Delivery" : "Complete Order"}
          </Button>
        </Modal.Footer>

      </Modal>
  )
}

export default OrderDetail