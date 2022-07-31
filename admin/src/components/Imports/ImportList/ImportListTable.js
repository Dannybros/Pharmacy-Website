import React from 'react'
import {Table,TableContainer, Paper, TableRow, TableCell, TableBody, Chip, Box, Typography} from '@mui/material'
import moment from 'moment'

function ImportListTable({data, handleDrawerOpen}) {

  const getMonth=(date)=>{
    return moment(date).format('MMM');
  }

  const getDate=(date)=>{
    return moment(date).format('DD');
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {data.map((row) => (
            <TableRow
              hover
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={()=>handleDrawerOpen(row)}
            >
              <TableCell sx={{display:"flex"}}>
                <Box sx={{
                    p:1,
                    mr:2,
                    textAlign:'center',
                    background:'rgb(229, 231, 235)',
                    borderRadius:16
                }}>
                    <Typography variant='subtitle2' gutterBottom>{getMonth(row.importDate)}</Typography>
                    <Typography component='h6'><b>{getDate(row.importDate)}</b> </Typography>
                </Box>

                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    <Typography variant='subtitle2' gutterBottom> 
                        ID: {row._id}
                    </Typography>
                    <Typography variant="body2" sx={{color:"rgb(101, 116, 139)"}}> Total: {row.subtotal.toLocaleString()}</Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Chip label={row.status} color={row.status==="Pending"? "warning" : row.status==="Cancelled"? "error" :"primary"}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ImportListTable