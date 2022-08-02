import React, {useState, useEffect} from 'react'
import {Box, Breadcrumbs, Link, Typography, TextField, Divider, Grid, Paper} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2'
import axios from '../../axios'
import RangedStats from './RangedStats';
import moment from 'moment'
import RevenueTable from './RevenueTable';
import RevenueChart from './RevenueChart';
import RevenueProfit from './RevenueProfit';

const getWeekAgo = (dateOnly = false) => {
    let d = new Date();
    d.setDate(d.getDate() - 6);
    return dateOnly ? new Date(d.toDateString()) : d;
};
  
function Revenue() {
    const [value, setValue] = useState({start:getWeekAgo(), end:new Date()});
    const [orders, setOrders] = useState([]);
    const [imports, setImports] = useState([]);
    
    useEffect(() => {
        const fetchOrders= async()=>{
        await axios.get(`/order/revenue/complete`)
        .then(res=>{
            setOrders(res.data)
        })
        .catch((error)=>{
            Swal.fire({
            title: 'error',
            text: error.response.data.message,
            icon: 'warning',
            })
        })
        }

        fetchOrders();
        
        return () => {
            setOrders([])
        }
    }, [])

    useEffect(() => {
        const fetchImport= async()=>{
        await axios.get(`/imports/revenue/checked`)
        .then(res=>{
            setImports(res.data)
        })
        .catch((error)=>{
            Swal.fire({
            title: 'error',
            text: error.response.data.message,
            icon: 'warning',
            })
        })
        }

        fetchImport();

        return () => {
            setImports([])
        }
    }, [])

    const filterDate=(data)=>{
        const filterArray = data.filter((item) => {
           if(moment(item.date).isBetween(value.start, value.end, 'day', '[]')) return item;
           else return null
        });

        return filterArray
    }

    return (
        <Box className="revenueReport">
            <Breadcrumbs aria-label="breadcrumb" sx={{mb:4}}>
                <Typography color="text.primary">Report</Typography>
                <Typography color="text.primary">Imports</Typography>
            </Breadcrumbs>

            <Divider/>
            <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", my:2}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date From"
                        value={value.start}
                        maxDate={new Date()}
                        onChange={(newValue) => {
                        setValue({...value, start:newValue});
                        }}
                        renderInput={(params) => <TextField {...params} sx={{width:"45%"}}/>}
                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Date To"
                        value={value.end}
                        maxDate={new Date()}
                        floatingLabelText="Date"
                        onChange={(newValue) => {
                        setValue({...value, end:newValue});
                        }}
                        renderInput={(params) => <TextField {...params} sx={{width:"45%"}}/>}
                    />
                </LocalizationProvider>
            </Box>
            <Divider/>
            
            <Box sx={{background:"#F9FAFC", py:1}}>
                <RangedStats orders={filterDate(orders)} imports={filterDate(imports)}/>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
                    <Grid item xs={12} lg={8}>
                        <RevenueChart orders={filterDate(orders)} imports={filterDate(imports)} dateRange={value}/>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <RevenueProfit orders={filterDate(orders)} imports={filterDate(imports)}/>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <RevenueTable data={filterDate(orders)} type="ORDER"/>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <RevenueTable data={filterDate(imports)} type="IMPORT"/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Revenue