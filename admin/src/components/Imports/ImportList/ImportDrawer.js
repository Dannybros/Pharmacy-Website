import React from 'react'
import { styled } from '@mui/material/styles';
import {Drawer, IconButton, Divider, List, ListItem, ListItemText, Box, Typography, ButtonGroup, Button, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment'
import axios from '../../axios'
import Swal from 'sweetalert2'

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    background:"#5048E5",
    alignItems: 'center',
    justifyContent:"space-between",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

function ImportDrawer({openDrawer, handleDrawerClose, selectedImport}) {

    const updateImportStatus=(status)=>{
        axios.post(`/imports/${status}`, {imports:selectedImport})
        .then(res=>{
            Swal.fire({
                title: 'success',
                text: res.data.message,
                icon: 'success',
            })
            handleDrawerClose();
        })
        .catch(err=>{
            Swal.fire({
              title: 'error',
              text: err.response.data.message,
              icon: 'warning',
            })
        })
    }

  return (
    <>
    <Drawer
        sx={{
          width: 500,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 500,
            marginTop:'65px'
          },
        }}
        variant="persistent"
        anchor="right"
        open={openDrawer}
      >
        <DrawerHeader sx={{color:"white", px:3}}>
            <Typography variant='h6'>{selectedImport.name}</Typography>
            <IconButton onClick={handleDrawerClose} sx={{color:"white"}}>
                <CloseIcon/>
            </IconButton>
        </DrawerHeader>
        <Divider />

        <Box sx={{px:4, py:2}}>
            {selectedImport.status==="Pending"&&
                <Box sx={{p:2, mb:2, background:"rgb(243, 244, 246)", borderRadius:5, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                    <Typography variant='span' className='drawer_action_text'>
                        Action
                    </Typography>
                    <ButtonGroup>
                        <Button variant='contained' color="secondary" sx={{mx:1}} onClick={()=>updateImportStatus('check')}>
                            Check 
                        </Button>
                        <Button variant='contained' color="error" onClick={()=>updateImportStatus('cancel')}> 
                            Reject 
                        </Button>
                    </ButtonGroup>
                </Box>
            }

            <List>
                <Typography variant="h6"><b>Details</b></Typography>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="ID"/>
                    <ListItemText secondary={selectedImport._id} />
                </ListItem>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="Supplier" sx={{maxWidth:120}}/>
                    <ListItemText secondary={selectedImport.supplierName}/>
                </ListItem>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="Order Date" sx={{maxWidth:120}}/>
                    <ListItemText secondary={moment(selectedImport.ImportDate).format("dddd, MMMM Do YYYY, h:mm A")} />
                </ListItem>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="Total" sx={{maxWidth:120}}/>
                    <ListItemText secondary={selectedImport.subtotal} />
                </ListItem>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="Status" sx={{maxWidth:120}}/>
                    <ListItemText secondary={selectedImport.status}/>
                </ListItem>
            </List>

            <Divider />

            <List>
                <Typography variant="h6" sx={{my:2}}><b>Import Orders</b></Typography>
                <Table aria-label="simple table" size="small">
                    <TableHead sx={{background:"#F3F4F6"}}>
                        <TableRow>
                            <TableCell> Description</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {selectedImport.importItems &&
                     selectedImport.importItems.map((row) => (
                        <TableRow
                        key={row._id}
                        sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row._id}
                            </TableCell>
                            <TableCell align="right">{row.buyingPrice.toLocaleString()} KIP</TableCell>
                            <TableCell align="right">{row.importAmount}</TableCell>
                            <TableCell align="right">{(row.buyingPrice * row.importAmount).toLocaleString()} KIP</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </List>
        </Box>
    </Drawer>
    </>
  )
}

export default ImportDrawer