import React from 'react'
import {Table,TableContainer, Paper, TableRow, TableCell, TableBody, Chip, Box, Typography, ListItemText} from '@mui/material'


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function ImportListTable({imports, handleDrawerOpen}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              hover
              key={row.name}
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
                    <Typography component='subtitle2' gutterBottom> JUL </Typography>
                    <Typography component='h6'><b>26</b> </Typography>
                </Box>

                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    <Typography variant='subtitle2' gutterBottom> 
                        ID: asldkfjasdfjalsdjfadjfaldskj
                    </Typography>
                    <Typography variant="body2" sx={{color:"rgb(101, 116, 139)"}}> Total: 26 </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Chip label={row.name} color="warning"/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ImportListTable