import React from 'react'
import {Button, Modal, Row, Col} from 'react-bootstrap'
import { styled } from '@mui/material/styles';
import {Divider, List, ListItem, ListItemText, Typography, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Paper} from '@mui/material'
import { useStateValue } from '../../../Reducer/StateProvider';
import { useTranslation } from 'react-i18next';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.action.selected,
}));

function OrderDetail({viewDetail, setViewDetail, data}) {

    const [{lang}] = useStateValue();
    const {t} = useTranslation();

  return (
    <Modal
        show={viewDetail}
        onHide={() => setViewDetail(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {t('OrderDetail.title')} 
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Typography variant="h6" component="div">
               <b>{t('OrderDetail.part1.heading')}</b>
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
                        <ListItem> 
                            <ListItemText primary={t('OrderDetail.part1.list2.p1')} secondary={t('OrderDetail.part1.list2.p2')}/> 
                        </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem>
                            <ListItemText 
                                primary={
                                    <Typography component="span" color="#757ce8"> {data?.customerName} </Typography>
                                } 
                                secondary="adds"
                            />
                        </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary={t('OrderDetail.part1.list3')}/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.createdAt}/> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary={t('OrderDetail.part1.list4')}/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.paymentMethod} /> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary={t('OrderDetail.part1.list5')}/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.orderTotal} /> </ListItem>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary={t('OrderDetail.part1.list6')}/> </ListItem>
                    </Col>
                    <Col xs={6}>
                        <ListItem> <ListItemText secondary={data?.status[lang]} /> </ListItem>
                    </Col>
                </Row>
            </List>
            <Divider/>
            <Typography sx={{ mt: 2, mb:2}} variant="h6" component="div">
               <b>{t('OrderDetail.part2.heading')}</b>
            </Typography>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <TableCell>{t('OrderDetail.part2.list1')}</TableCell>
                            <TableCell align="center">{t('OrderDetail.part2.list2')}</TableCell>
                            <TableCell align="center">{t('OrderDetail.part2.list3')}</TableCell>
                            <TableCell align="center">{t('OrderDetail.part2.list4')}</TableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data!==null&&
                        data.orderItems.map((item)=>{
                            return(
                                <TableRow key={item._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row" style={{display:"flex"}}>
                                        <img className="order_detail_img" src={item.img} alt=""/>
                                        <ListItemText
                                            primary={item.name[lang]}
                                            secondary={item._id}
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
          <Button onClick={() => setViewDetail(false)}>{t('OrderDetail.btnClose')}</Button>
        </Modal.Footer>

      </Modal>
  )
}

export default OrderDetail