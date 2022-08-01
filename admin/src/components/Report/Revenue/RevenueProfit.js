import React from 'react'
import {Paper, Typography} from '@mui/material'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  
function RevenueProfit({orders, imports}) {
    const options = {
        elements: {
          bar: {
            borderWidth: 3
          }
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: "bottom"
          },
          title: {
            display: true,
            text: "Chart.js Horizontal Bar Chart"
          }
        },
        scale:{
            y:{
                max:orders.length<imports.length ? imports.length + 3 : orders.length + 3,
                stepSize:1,
            }
        }
    };

    const data = {
        labels:["Compare Order & Input"],
        datasets: [
          {
            label: 'Orders',
            data: [orders.length],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Imports',
            data: [imports.length],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };

    const getTotal=(arr)=>{
        const totalCart = arr.reduce((total, item)=>{
            total += parseInt(item.total);
            return total;
        }, 0)

        return totalCart
    }

  return (
    <Paper variant="outlined" sx={{maxHeight:380}}>
        <Bar options={options} data={data} style={{height:"200px"}}/>
        
        <Typography variant="h6" gutterBottom component="div" sx={{background:"#4caf50", px:2, py:1, mt:1, color:"white"}}>
            <b>  
            Profit: {(getTotal(orders) - getTotal(imports)).toLocaleString()} KIP
            </b> 
        </Typography>
    </Paper>
  )
}

export default RevenueProfit