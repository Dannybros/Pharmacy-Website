import React, {useState} from 'react'
import {Paper, Radio, FormControlLabel, RadioGroup} from '@mui/material'
import moment from 'moment'
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const formatDate=(d)=>{
        return moment(d).format("YYYY-MM-DD");
}

const getRangeDate=(dates)=>{
    var days=[];
    var startDay  = moment(dates.start)
    const endDay  = moment(dates.end)

    while (startDay <= endDay){
        days.push(formatDate(startDay))
        startDay = startDay.clone().add(1, 'd');
    }
    return days
}

const mergeData=(a, b)=>{
    const order =  a.reduce((arr, obj)=>{
        var i = arr.findIndex( x => x.date === formatDate(obj.date));
        return i === -1 ? arr.push({ date :formatDate(obj.date), order : obj.total }) : arr[i].order+=obj.total, arr;
    }, [])

    const imported = b.reduce((arr, obj)=>{
        var i = arr.findIndex( x => x.date === formatDate(obj.date));
        return i === -1 ? arr.push({ date :formatDate(obj.date), imports : obj.total }) : arr[i].imports+=obj.total, arr;
    }, [])

    const mergeByProperty = (target, source, prop) => {
        source.forEach(sourceElement => {
        let targetElement = target.find(targetElement => {
            return sourceElement[prop] === targetElement[prop];
        })
        targetElement ? Object.assign(targetElement, sourceElement) : target.push(sourceElement);
        })
    }
    mergeByProperty(order, imported, 'date')

    // const newArr = [...new Set([...order, ...imported])]
    // console.log(order, imported);

    return order
}  

function RevenueChart({orders, imports, dateRange}) {

    const [type, setType] = useState('order-import');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const getChartData=()=>{
        const data= mergeData(orders, imports);
        const days = getRangeDate(dateRange)

        const dd = days.map(day=>{
            const initialVal = {date: day, order:0, imports:0};
            const dayData= data.find(item=>{
                return item.date===day
            })

            return {...initialVal, ...dayData}
        })

        return dd
    }
   
    const chartData= getChartData();

    const data = {
        labels: getRangeDate(dateRange),
        datasets:  type!=="profit"? [
            {
                label: "Order",
                data: chartData.map(item=>item.order),
                fill: false,
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Import",
                data: chartData.map(item=>item.imports),
                fill: false,
                borderColor: "#742774"
            }
        ] : [
            {
                label: "Profits",
                data: chartData.map(item=>item.order - item.imports),
                fill: true,
                borderColor: "rgba(46, 125, 50)"
            }
        ],
      };

  return (
    <Paper variant='outlined'>
        <RadioGroup
            sx={{mx:2, my:1}}
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={type}
            onChange={handleChange}
        >
            <FormControlLabel value="order-import" control={<Radio defaultValue/>} label="Order-Import" />
            <FormControlLabel value="profit" control={<Radio />} label="Profits" />
        </RadioGroup>

        <Line data={data} options={{
            tension:0.4
        }}/>
    </Paper>
  )
}

export default RevenueChart 