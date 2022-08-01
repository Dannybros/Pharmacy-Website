import React from 'react'
import { styled } from '@mui/material/styles';
import {Box, Typography, Grid, Paper} from '@mui/material'
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledOrderPaper = styled(Paper)(({ theme }) => ({
    '&': {
      backgroundColor: theme.palette.success.main,
      color:theme.palette.common.white
    },
}));

const StyledImportPaper = styled(Paper)(({ theme }) => ({
    '&': {
      backgroundColor: theme.palette.secondary.light,
      color:theme.palette.common.white
    },
}));

function RangedStats({orders, imports}) {

    const GridItem = ({title, content, ICON, PaperType})=>{
        return(
            <Grid item xs={6} lg={3}>
                <PaperType sx={{p:2, px:3, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <Box>
                        <Typography variant="body2" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" component="div">
                            <b> {content} </b>
                        </Typography>
                    </Box>
                    <ICON sx={{transform:"scale(1.8)"}}/>
                </PaperType>
            </Grid>
        )
    }

    const getTotal=(arr)=>{
        const totalCart = arr.reduce((total, item)=>{
            total += parseInt(item.total);
            return total;
        }, 0)

        return totalCart.toLocaleString()
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
            <GridItem title="Orders" content={"Total: " + orders.length} ICON={ShoppingCartIcon} PaperType={StyledOrderPaper}/>
            <GridItem title="Orders" content={getTotal(orders) + " KIP"} ICON={QueryStatsIcon} PaperType={StyledOrderPaper}/>
            <GridItem title="Imports" content={"Total: " + imports.length} ICON={ImportExportIcon} PaperType={StyledImportPaper}/>
            <GridItem title="Imports" content={getTotal(imports) + " KIP"} ICON={QueryStatsIcon} PaperType={StyledImportPaper}/>
        </Grid>
    )
}

export default RangedStats