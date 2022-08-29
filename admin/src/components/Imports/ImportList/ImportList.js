import React, {useState, useEffect} from 'react'
import './ImportList.scss'
import {Box, Breadcrumbs, Typography, TextField, InputAdornment} from '@mui/material'
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
  const [search, setSearch] = useState("");
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filterSearch=(data, searchQuery)=>{
    if(!searchQuery) return data;
  
    const searchTerm = searchQuery.toLowerCase()

    const filterData = data.filter((item)=>{
        return item._id.toLowerCase().includes(searchTerm)
    })
    
    return filterData
  }

  return (
    <Box className="import_checkList">
      <Breadcrumbs aria-label="breadcrumb" sx={{mb:4}}>
        <Typography color="text.primary">Order Import</Typography>
        <Typography color="text.primary">New Import List</Typography>
      </Breadcrumbs>

      <TextField
       sx={{width:"100%"}}
        label="Search"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <ImportListTable handleDrawerOpen={handleDrawerOpen} data={filterSearch(imports, search)}/>

      <ImportDrawer openDrawer={openDrawer} handleDrawerClose={handleDrawerClose} selectedImport={selectedImport}/>
    </Box>
  )
}

export default ImportList