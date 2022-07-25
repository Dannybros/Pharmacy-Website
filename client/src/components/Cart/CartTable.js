import React from 'react'
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

function CartTable({cart, lang, goPayment}) {

    const {t} = useTranslation();
    
    const cartTotal = cart.reduce((total, currentItem)=>{
        total += currentItem.price * currentItem.quantity;
        return total;
    }, 0)

  return (
    <TableContainer component={Paper} sx={{p:1}}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              <b>Details</b>
            </TableCell>
            <TableCell align="right">
                <b>Price</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><b>{t('Cart.Receipt.header.list1')}</b></TableCell>
            <TableCell align="right"><b>{t('Cart.Receipt.header.list2')}</b></TableCell>
            <TableCell align="right"><b>{t('Cart.Receipt.header.list3')}</b></TableCell>
            <TableCell align="right"><b>{t('Cart.Receipt.header.list4')}</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.name[lang]}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price} KIP</TableCell>
              <TableCell align="right">{row.price * row.quantity} KIP</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3}/>
            <TableCell>
                <b>{t('Cart.Receipt.total')}</b>
            </TableCell>
            <TableCell align="right" colSpan={2}>
                <b>{cartTotal.toLocaleString()} KIP</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={3}> 
                <Button variant='contained' onClick={goPayment}>
                    {t('Cart.Receipt.btnCheck')}    
                </Button> 
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CartTable