import React, {useState, useEffect} from 'react'
import './ImportList.scss'
import {Box, Breadcrumbs, Link, Typography, TextField, InputAdornment} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ImportListTable from './ImportListTable';
import ImportDrawer from './ImportDrawer';
import axios from '../../axios'
import Swal from 'sweetalert2'
import { useStateValue } from '../../../context/StateProvider';

function ImportList() {

  const [openDrawer, setOpenDrawer] = useState(false);
  const [imports, setImports] = useState([]);
  const [selectedImport, setSelectedImport] = useState({});
  const [{socket}] = useStateValue();

  useEffect(() => {
    const fetchPendingImport=async()=>{
      await axios.get('/imports/pending')
      .then(res=>setImports(res.data))
      .catch(err=>{
        Swal.fire({
          title: 'error',
          text: err.response.data.message,
          icon: 'warning',
        })
      })
    }

    fetchPendingImport();
  
    return () => {
      setImports([])
    }
  }, [])

  useEffect(() => {
    socket.on('import-update', async(data)=>{
       const updatedImport = data.data;
       setImports((items)=>{return items.filter((item)=>item._id!==updatedImport._id)});
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

  return (
    <Box sx={{p:3}}>
      <Breadcrumbs aria-label="breadcrumb" sx={{mb:4}}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="">
          Import 
        </Link>
        <Typography color="text.primary">Import List</Typography>
      </Breadcrumbs>

      <TextField
       sx={{width:"100%"}}
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
      <ImportListTable handleDrawerOpen={handleDrawerOpen} data={imports}/>

      <ImportDrawer openDrawer={openDrawer} handleDrawerClose={handleDrawerClose} selectedImport={selectedImport}/>
    </Box>
  )
}

export default ImportList