import React, {useState} from 'react'
import './ImportReport.scss'
import {Box, Breadcrumbs, Link, Typography, TextField, InputAdornment, Paper, Tabs, Tab, Divider, FormControl, MenuItem, InputLabel, Select} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ImportListTable from '../../Imports/ImportList/ImportListTable';
import ImportDrawer from '../../Imports/ImportList/ImportDrawer';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ImportReport() {

  const [openDrawer, setOpenDrawer] = useState(false);
  const [imports, setImports] = useState([]);
  const [selectedImport, setSelectedImport] = useState({});
  const [importFilter, setImportFilter] = useState({search:"", date:null, status:"All"});

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

  const handleChangeDate=(e)=>{
    setImportFilter({...importFilter, date:e.target.value});
  }

  return (
    
    <Box sx={{p:3}}>
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
            <Tab label="Completed" value="Checked"/>
            <Tab label="Cancelled" value="Cancelled"/>
        </Tabs>

        <Divider/>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", mt:2}}>
          <TextField
            label="Search"
            placeholder="Search..."
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

      <ImportListTable handleDrawerOpen={handleDrawerOpen}/>

      <ImportDrawer openDrawer={openDrawer} handleDrawerClose={handleDrawerClose} selectedImport={selectedImport}/>
    </Box>
  )
}

export default ImportReport