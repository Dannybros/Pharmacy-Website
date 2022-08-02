import React, {useState, useEffect} from 'react'
import {Breadcrumbs, Typography, Box, Paper, Grid, List, TablePagination, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Rating} from '@mui/material'
import './Home.scss'
import DataUsageIcon from '@mui/icons-material/DataUsage';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';
import axios from '../axios'

const GridItem=({bg, title, status, ICON, iconColor})=>{
  return(
    <Grid item xs={12} md={4}>
      <Paper sx={{p:2, background:bg, color:"white"}} className="home_stats_item">
        <Box >
          <Typography variant="h6" component="div">
              <b> {title}</b>
          </Typography>
          <Typography variant="body2" gutterBottom>
            {status}
          </Typography>
        </Box>
        <ICON sx={{fontSize:60, color:iconColor}}/>
      </Paper>
    </Grid>
  )
}

const GridMenu=({bg, title, status, ICON})=>{
  return(
    <Grid item xs={6} md={3}>
      <Paper sx={{p:2, background:bg, color:"white"}} className="home_stats_item">
        <Box >
          <Typography variant="body2" gutterBottom>
            {title}
          </Typography>
          <ICON sx={{fontSize:30, color:"white"}}/>
        </Box>
        <Typography variant="h4" component="div">
          <b> {status}</b>
        </Typography>
      </Paper>
    </Grid>
  )
}

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      textTransform:"capitalize"
    },
    children: name.charAt(0),
  };
}

function Home() {

  const [data, setData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  useEffect(() => {
    const fetchData= async()=>{
    await axios.get(`/user/home`)
    .then(res=>{
      setData(res.data)
    })
    .catch((error)=>{
      console.log(error.response.data.message);
    })
    }

    fetchData();
    
    return () => {
        setData([])
    }
  }, [])

  useEffect(() => {
    const fetchReview=async()=>{
      await axios.post('/review/get/all-review', {reviewTo:"shop"})
      .then(res=>{
        setReviews(res.data.data)
      })
      .catch(err=>{
          console.log(err);
      })
    }
    fetchReview()
  }, [])
  
  return (
    <div className='homepage'>
      <Breadcrumbs aria-label="breadcrumb" sx={{mb:4}}>
        <Typography color="text.primary">/Home/</Typography>
      </Breadcrumbs>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
        <GridMenu bg="#2e7d32" title="Employees" status={data.emp? data.emp : 0} ICON={BadgeIcon}/>
        <GridMenu bg="#0288d1" title="Customers" status={data.cust? data.cust : 0} ICON={PersonIcon} />
        <GridMenu bg="#9c27b0" title="Medicines" status={data.items? data.items : 0} ICON={AddIcon} />
        <GridMenu bg="#ef5350" title="Medicine Categories" status={data.types? data.types : 0} ICON={CategoryIcon} />
      </Grid>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
        <GridItem bg="#03a9f4" title="Orders" status={`Completed: ${data.orderChecked? data.orderChecked : 0}`} ICON={DataUsageIcon} iconColor="#01579b"/>
        <GridItem bg="#ff9800" title="Orders" status={`Pending: ${data.orderPending? data.orderPending : 0}`} ICON={DataUsageIcon} iconColor="#e65100"/>
        <GridItem bg="#ef5350" title="Orders" status={`Cancelled: ${data.orderCancel? data.orderCancel : 0}`} ICON={DataUsageIcon} iconColor="#c62828"/>
        <GridItem bg="#03a9f4" title="Orders" status={`Checked: ${data.importChecked? data.importChecked : 0}`} ICON={ImportExportIcon} iconColor="#01579b"/>
        <GridItem bg="#ff9800" title="Orders" status={`Pending: ${data.importPending? data.importPending : 0}`} ICON={ImportExportIcon} iconColor="#e65100"/>
        <GridItem bg="#ef5350" title="Orders" status={`Cancelled: ${data.importCancel? data.importCancel : 0}`} ICON={ImportExportIcon} iconColor="#c62828"/>
      </Grid>
      <Paper variant='outlined' sx={{mt:3}}>
        <Typography variant="h4" component="div" sx={{m:3}}>
          Reviews (Shop)
        </Typography>
        <Divider/>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {(rowsPerPage > 0
              ? reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : reviews
          ).map((row) => (
              <div key={row.name}>
              <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                      <Avatar {...stringAvatar(row.name)}/>
                  </ListItemAvatar>
                  <ListItemText
                  primary={row.name}
                  secondary={
                      <React.Fragment>
                          <Rating value={row.value}/> <br/>
                          <Typography variant='span'>
                            {row.des}
                          </Typography>
                      </React.Fragment>
                  }/>
              </ListItem>
              <Divider variant="inset" component="li" />
              </div>
          ))}
        </List>
        <TablePagination
          component="div"
          rowsPerPageOptions={[5, 10, 25]}
          colSpan={3}
          count={reviews.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default Home