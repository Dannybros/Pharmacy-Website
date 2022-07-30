import React, {useState, useEffect} from 'react'
import './Import.scss'
import { styled } from '@mui/material/styles';
import {Box,Breadcrumbs, Link, Typography, Paper, InputLabel, TextField, InputAdornment, Select, FormControl, MenuItem, IconButton, Badge} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import axios from '../../axios'
import Swal from 'sweetalert2'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ItemList from './ItemList';
import CartModal from './CartModal';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 2,
    top:2,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function Import() {
  const [filter, setFilter]=useState({search:"", cat:"All"});
  const [category, setCategory] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts= async()=>{
      await axios.get('/products')
      .then(res=>{
        setProducts(res.data)
      })
      .catch(err=>alert(err))
    }

    fetchProducts();
  }, [])

  useEffect(() => {
    const fetchCategory= async()=>{
      await axios.get('/category')
      .then(res=>{
        setCategory(res.data)
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
  }, [])

  const handleFilterCat = (event) => {
    setFilter({...filter, cat: event.target.value});
  };

  const handleFilterSearch=(event)=>{
    setFilter({...filter, search: event.target.value});
  }

  const handleOpenCart = ()=>{
    if(cart.length>0){
      setOpenCart(true);
    }else{
      alert("Please Add Import Items.")
    }
  }
  
  const handleCloseCart=()=>{
    setOpenCart(false)
  }

  const filterImport=(data)=>{
    if(!filter.search && !filter.cat==="All") return data;

    const searchTerm = filter.search.toLowerCase();

    const searchCat = filter.cat==="All"? "" : filter.cat.toLowerCase()
    
    const filterData = data.filter((item)=>{
        return item.type.en.toLowerCase().includes(searchCat) && item.name.en.includes(searchTerm)
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
          Import
        </Link>
        <Typography color="text.primary">Order Import</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{mb:2 ,p:2, display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <Box sx={{display:"flex", alignItems:"center"}}>
          <TextField
            label="Search"
            placeholder="Search..."
            onChange={handleFilterSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="import-category-select-label">Categories</InputLabel>
            <Select
              labelId="import-category-select-label"
              id="import-category-select"
              label="Categories"
              value={filter.cat}
              onChange={handleFilterCat}
              displayEmpty
            >
              <MenuItem value="All"> All</MenuItem>
              {category.map(item=>(
                <MenuItem value={item.Name.en} key={item.Name.en}>{item.Name.en}</MenuItem>
              ))}
            </Select>
          </FormControl>`
        </Box>

        <IconButton size="large" onClick={handleOpenCart}>
          <StyledBadge badgeContent={cart.length} color="primary">
            <ShoppingBasketIcon  sx={{transform:"scale(1.3)"}}/>
          </StyledBadge>
        </IconButton>
      </Paper>

      <ItemList items={filterImport(products)} cart={cart} setCart={setCart}/>
      
      <CartModal openCart={openCart} cart={cart} handleCloseCart={handleCloseCart} setCart={setCart}/>
    </Box>
  )
}

export default Import