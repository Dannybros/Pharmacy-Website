import React from 'react'
import './ImportList.scss'
import {Box, Breadcrumbs, Link, Typography} from '@mui/material'

function ImportList() {
  return (
    <Box sx={{p:3}}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="">
          Import
        </Link>
        <Typography color="text.primary">Import List</Typography>
      </Breadcrumbs>
    </Box>
  )
}

export default ImportList