import React, {Fragment} from 'react'
import {Button, Modal, Row, Col} from 'react-bootstrap'
import { styled } from '@mui/material/styles';
import {Divider, List, ListItem, ListItemText, Typography, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Paper} from '@mui/material'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.action.selected,
}));

function OrderDetail({viewDetail, setViewDetail, data}) {

  return (
    <Modal
        show={viewDetail}
        onHide={() => setViewDetail(false)}
        size="lg"
        //dialogClassName="modal_view"
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
                        <ListItem> <ListItemText secondary="ID" /> </ListItem>
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
                                    <Fragment> <Typography component="span" color="#757ce8"> Customer Name </Typography> </Fragment>
                                } 
                                secondary="Address adf asdf asdf asdf "
                            />
                        </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Date_Time"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary="Date_Time" /> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Payment Method"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary="Payment Method" /> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Total Amount"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary="Total Amount" /> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Status"/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary="Status" /> </ListItem>
                    </Col>
                </Row>
            </List>
            <Divider/>
            <Typography sx={{ mt: 2, mb:2}} variant="h6" component="div">
               <b>Order Items</b>
            </Typography>

            <TableContainer component={Paper}>
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
                        {data&&
                        data.map((item)=>{
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
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setViewDetail(false)}>Close</Button>
        </Modal.Footer>

      </Modal>
  )
}

export default OrderDetail