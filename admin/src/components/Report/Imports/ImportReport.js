import React, {useState, useEffect} from 'react'
import './ImportReport.scss'
import axios from '../../axios'
import {Box, Breadcrumbs, Link, Typography, TextField, InputAdornment, Paper, Tabs, Tab, Divider} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2'
import ImportListTable from '../../Imports/ImportList/ImportListTable';
import ImportDrawer from '../../Imports/ImportList/ImportDrawer';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'
import { useStateValue } from '../../../context/StateProvider';

function ImportReport() {

  const [openDrawer, setOpenDrawer] = useState(false);
  const [imports, setImports] = useState([]);
  const [selectedImport, setSelectedImport] = useState({});
  const [importFilter, setImportFilter] = useState({search:"", date:null, status:"All"});
  const [{socket}] = useStateValue();

  useEffect(() => {
    const fetchImports=async()=>{
      await axios.get('/imports')
      .then(res=>setImports(res.data))
      .catch(err=>{
        Swal.fire({
          title: 'error',
          text: err.response.data.message,
          icon: 'warning',
        })
      })
    }

    fetchImports();
  
    return () => {
      setImports([])
    }
  }, [])

  useEffect(() => {
    if(!socket) return null;
    
    socket.on('import-update', async(data)=>{
       const updatedImport = data.data;
       setImports(oldItems=>{
        return oldItems.map(imports => {
          return imports._id === updatedImport._id ? { ...updatedImport} : imports
        })
      })
    })

  }, [socket])

  const handleDrawerOpen  = async(item)=>{
    await setSelectedImport(item);
    setOpenDrawer(true);
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setSelectedImport({});
  };

  const handleChangeTab = (event, newValue) => {
    setImportFilter({...importFilter, status:newValue});
  };

  const handleOnSearch = (event) => {
    setImportFilter({...importFilter, search:event.target.value});
  };
  
  const filterImport=(data, filter)=>{
    const searchTerm = filter.search.toLowerCase();
    const searchStatus = filter.status==="All"? '' : filter.status.toLowerCase();
    const searchDate = filter.date===null? '' : moment(filter.date).format("YYYY-MM-DD");

    const filterData = data.filter((item)=>{
      return item._id.toLowerCase().includes(searchTerm) && item.status.toLowerCase().includes(searchStatus) && item.importDate.includes(searchDate)
    })
    
   return filterData
  }

  return (
    <Box sx={{p:{ xs: 0, md: 3}}}>
      <Breadcrumbs aria-label="breadcrumb" sx={{mb:4}}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="">
          Report 
        </Link>
        <Typography color="text.primary">Imports</Typography>
      </Breadcrumbs>

      
      <Paper variant='outlined' sx={{ width: '100%', bgcolor:"white", pt:1}}>
        <Tabs
            value={importFilter.status}
            onChange={handleChangeTab}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
        >
            <Tab label="All" value="All" />
            <Tab label="Pending"  value="Pending"/>
            <Tab label="Checked" value="Checked"/>
            <Tab label="Cancelled" value="Cancelled"/>
        </Tabs>

        <Divider/>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", my:2}}>
          <TextField
            label="Search"
            sx={{minWidth:"50%"}}
            placeholder="Search..."
            onChange={handleOnSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="mm/dd/yyyy"
              value={importFilter.date}
              onChange={(newValue) => {
                setImportFilter({...importFilter, date:newValue});
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Paper>

      <ImportListTable handleDrawerOpen={handleDrawerOpen} data={filterImport(imports, importFilter)}/>

      <ImportDrawer openDrawer={openDrawer} handleDrawerClose={handleDrawerClose} selectedImport={selectedImport}/>
    </Box>
  )
}

export default ImportReport