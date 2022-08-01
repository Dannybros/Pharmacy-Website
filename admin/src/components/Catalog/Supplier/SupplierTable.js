import React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function SupplierTable({data, search, handleModalShow, handleDeleteSupplier}) {

    const filterSupplier=(data, searchQuery)=>{
        if(!searchQuery) return data;
  
        const searchTerm = searchQuery.toLowerCase()
  
        const filterData = data.filter((item)=>{
            const name = item.name.toLowerCase();
            return name.includes(searchTerm)
        })
        
        return filterData
    }

    return (
    <TableContainer component={Paper} className="my-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell sx={{background:"#2e7d32", color:"white"}} align="center"><b>No.</b></TableCell>
            <TableCell sx={{background:"#2e7d32", color:"white"}} align="center"><b>Supplier Name</b></TableCell>
            <TableCell sx={{background:"#2e7d32", color:"white"}} align="center"><b>Phone</b></TableCell>
            <TableCell sx={{background:"#2e7d32", color:"white"}} align="center"><b>Email</b></TableCell>
            <TableCell sx={{background:"#2e7d32", color:"white"}} align="center"><b>Action</b></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {data.length > 0 &&
            filterSupplier(data, search).map((row, i) => (
                <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="center">{i+1}</TableCell>
                    <TableCell component="th" align="center" scope="row" style={{textTransform:"capitalize"}}>{row.name} </TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                        <IconButton className='mx-1' aria-label="edit" style={{background:"#1976d2", color:"white"}} onClick={()=>handleModalShow(row)}>
                        <EditIcon />
                        </IconButton>

                        <IconButton className='mx-1' aria-label="delete" style={{background:"#d32f2f", color:"white"}} onClick={()=>handleDeleteSupplier(row._id)}>
                        <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            ))
            }
        </TableBody>
        </Table>
    </TableContainer>
  )
}

export default SupplierTable