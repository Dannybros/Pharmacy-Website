import React from 'react'
import {Typography, Paper, Avatar, Box, Rating, Stack, Divider, Grid} from '@mui/material'

function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
}

function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        textTransform:"capitalize"
      },
      children: name.charAt(0),
    };
}

function ReviewList({data}) {
  return (
    <Paper variant='outlined' sx={{p:2, mx:1, textAlign:'center', boxShadow:'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
        <Box sx={{display:'flex', justifyContent:'center', mt:1, mb:2}}>
            <Avatar {...stringAvatar(data.name)}/>
        </Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb:1}}>
            <Typography sx={{color:"rgba(0,0,0,0.6)", fontSize:'16px'}}>{data.name}</Typography>
            <Rating name="no-value" value={data.value} readOnly  size="large"/>
        </Stack>
        <Divider/>

        <Grid container wrap="nowrap">
          <Grid item xs>
            <Typography component='div' 
            sx={{
                mt:2, 
                maxHeight:150,
                minHeight:100,
                textAlign:'justify', 
                fontSize:'13px', 
                textTransform:"capitalize", 
                textIndent:10,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "7",
                WebkitBoxOrient: "vertical",
                }}>
                {data.des }
            </Typography>
          </Grid>
        </Grid>
    </Paper>
  )
}

export default ReviewList