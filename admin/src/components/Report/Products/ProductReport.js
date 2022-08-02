import React, { useState, useEffect } from 'react'
import './ProductReport.scss'
import axios from '../../axios'
import {Box, Breadcrumbs, Link, Typography, TextField, InputAdornment, Paper, FormControl, MenuItem, InputLabel, Select} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2'
import ProductTable from './ProductTable';

function ProductReport() {

  const [productFilter, setProductFilter] = useState({search:"", cat:"All", sort:0})
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts= async()=>{
      await axios.get('/products')
      .then(res=>{
        setProducts(res.data)
      })
      .catch(err=>alert(err))
    }

    fetchProducts();

    return () => {
      setProducts([])
    }
  }, [])

  useEffect(() => {
    const fetchCategory= async()=>{
      await axios.get('/category')
      .then(res=>{
        setCategories(res.data)
      })
      .catch((error)=>{
        Swal.fire({
          title: 'error',
          text: error.response.data.message,
          icon: 'warning',
        })
      })
    }

    fetchCategory();

    return () => {
      setCategories([])
    }
  }, [])

  const handleOnSearch = (event) => {
    setProductFilter({...productFilter, search:event.target.value});
  };

  const handleOnSelect = (event) => {
    setProductFilter({...productFilter, cat:event.target.value});
  };

  const handleOnSort = (event) => {
    setProductFilter({...productFilter, sort:event.target.value});
  };

  const sortData=(data, sortValue)=>{
    switch (sortValue) {

      case 0:
        return data.sort((a,b) => a.quantity - b.quantity)
      
      case 1:
        return data.sort((a,b) => a.expireDate - b.expireDate)
      default:
        break;
    }
  }

  const filterData=(data, filter)=>{
    const searchTerm = filter.search.toLowerCase();
    const searchType = filter.cat==="All"? '' : filter.cat.toLowerCase();

    const filterData = data.filter((item)=>{
      return item.name.en.toLowerCase().includes(searchTerm) && item.type.en.toLowerCase().includes(searchType)
    })
    
    return sortData(filterData, productFilter.sort)
  }

  return (
    <Box className="productReport">
      <Breadcrumbs aria-label="breadcrumb" sx={{mb:{ xs: 2, md: 4}}}>
        <Typography color="text.primary">Report</Typography>
        <Typography color="text.primary">Products</Typography>
      </Breadcrumbs>

      <Box component={Paper} variant="outlined" sx={{
        display:"flex", 
        alignItems:"center", 
        justifyContent:"space-between", 
        gap:2,
        my:{ xs: 0, md: 2}, 
        p:2
        }} 
      >
        <TextField
          label="Search"
          fullWidth
          // sx={{minWidth:"50%"}}
          placeholder="Search..."
          onChange={handleOnSearch}
          value={productFilter.search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{width:200}}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productFilter.cat}
            label="Category"
            onChange={handleOnSelect}
          >
            <MenuItem value="All">All</MenuItem>
            {categories.map((cat, i)=>(
              <MenuItem value={cat.Name.en} key={i}>{cat.Name.en}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{width:200}}>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productFilter.sort}
            label="Sort"
            onChange={handleOnSort}
          >
            <MenuItem value={0}>Least Amount</MenuItem>
            <MenuItem value={1}>Expire Date</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ProductTable data={filterData(products, productFilter)}/>
    </Box>
  )
}

export default ProductReport