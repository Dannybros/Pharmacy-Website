import React, {useRef} from 'react'
import {Button, Modal, Row, Col} from 'react-bootstrap'
import { styled } from '@mui/material/styles';
import {Divider, List, ListItem, ListItemText, Typography, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Paper} from '@mui/material'
import { useStateValue } from '../../../Reducer/StateProvider';
import { useTranslation } from 'react-i18next';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.action.selected,
}));

function OrderDetail({viewDetail, setViewDetail, data}) {

    const printRef = useRef();

    const [{lang}] = useStateValue();
    const {t} = useTranslation();

    const handleDownloadPdf = async () => {

        const element = printRef.current;
        const canvas = await html2canvas(element);
        const file = canvas.toDataURL('image/png');
    
        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(file);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
          (imgProperties.height * pdfWidth) / imgProperties.width;
    
        pdf.addImage(file, 'PNG', 0, 10, pdfWidth, pdfHeight);
        pdf.save(`order-${data?._id}.pdf`);
    };

  return (
    <Modal
        show={viewDetail}
        onHide={() => setViewDetail(false)}
        size="lg"
      >
        <Modal.Header closeButton>
        </Modal.Header>

        <Modal.Body ref={printRef}>
            <Typography variant="h4" component="div" sx={{mb:2}}>
               <strong>{t('OrderDetail.title')} </strong> 
            </Typography>
            <Typography variant="h6" component="div">
               <b>{t('OrderDetail.part1.heading')}</b>
            </Typography>
            <List dense={true}>
                <Row>
                    <Col xs={6}>
                        <ListItem> <ListItemText primary="Order ID"/> </ListItem>
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
                                secondary={data?.customerAddress.addr? data?.customerAddress.addr : data?.customerAddress.coords.lat + " " + data?.customerAddress.coords.lng}
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
                            <TableRow key={item._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" style={{display:"flex"}}>
                                    {/* <img className="order_detail_img" src={item.img} alt=""/> */}
                                    <ListItemText
                                        primary={item?.name[lang]}
                                        secondary={item._id}
                                    />
                                </TableCell>
                                <TableCell align="center">{item.price} KIP</TableCell>
                                <TableCell align="center">{item.quantity}</TableCell>
                                <TableCell align="center">{item.quantity * item.price} KIP</TableCell>
                            </TableRow>
                            )
                        })}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{data?.orderTotal} KIP</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setViewDetail(false)}>{t('OrderDetail.btnClose')}</Button>
          <Button variant="success" onClick={handleDownloadPdf}>Print PDF</Button>
        </Modal.Footer>

      </Modal>
  )
}

export default OrderDetail