import React from 'react'
import { styled } from '@mui/material/styles';
import {Drawer, IconButton, Divider, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Box, Typography, ButtonGroup, Button, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    background:"#5048E5",
    alignItems: 'center',
    justifyContent:"space-between",
    padding: theme.spacing(0, 1),
    
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

function ImportDrawer({openDrawer, handleDrawerClose, selectedImport}) {
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

        <Box sx={{p:4}}>
            <Box sx={{p:2, background:"rgb(243, 244, 246)", borderRadius:5, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <Typography variant='span' className='drawer_action_text'>
                    Action
                </Typography>
                <ButtonGroup>
                    <Button variant='contained' color="secondary" sx={{mx:1}}> Check </Button>
                    <Button variant='contained' color="error"> Reject </Button>
                </ButtonGroup>
            </Box>

            <List>
                <Typography variant="h6" sx={{mt:2}}><b>Details</b></Typography>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="ID" />
                    <ListItemText secondary="ID" />
                </ListItem>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="Supplier" />
                    <ListItemText secondary="Supplier" />
                </ListItem>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="Order Date" />
                    <ListItemText secondary="Order Date" />
                </ListItem>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="Expected Arrival" />
                    <ListItemText secondary="Expected Arrival" />
                </ListItem>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="Total" />
                    <ListItemText secondary="Total" />
                </ListItem>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="Total" />
                    <ListItemText secondary="Total" />
                </ListItem>
                <ListItem sx={{py:1}}>
                    <ListItemText primary="Status" />
                    <ListItemText secondary="Total" />
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
                    {['All mail', 'Trash', 'Spam'].map((row) => (
                        <TableRow
                        key={row}
                        sx={{'&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row}
                            </TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
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