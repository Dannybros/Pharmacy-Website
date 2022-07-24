import React, {useState, useEffect} from 'react'
import {List, ListItem , ListItemAvatar, ListItemText, Typography, Paper, TablePagination, Avatar, Divider, Rating} from '@mui/material'
import axios from '../../axios/axios'
import {useTranslation} from 'react-i18next'

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

function ReviewList({id}) {

    const [data, setData] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const {t} = useTranslation();
    
    useEffect(() => {
        const fetchReview=async()=>{
          await axios.post('/review/get/all-review', {reviewTo:id})
          .then(res=>{
            setData(res.data.data)
          })
          .catch(err=>{
              console.log(err);
          })
        }
        fetchReview()
    }, [id])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };
    
  return (
    <Paper variant='outlined' sx={{mt:5, p:3}}>
        <Typography variant="h4" component="div">
            {t('ProductInfo.Reviews')}
        </Typography>

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

            {(rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data
            ).map((row) => (
                <div key={row.name}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar {...stringAvatar(row.name)}/>
                    </ListItemAvatar>
                    <ListItemText
                    primary={row.name}
                    secondary={
                        <React.Fragment>
                            <Rating value={row.value}/> <br/>
                            <Typography variant='span'>
                               {row.des}
                            </Typography>
                        </React.Fragment>
                    }/>
                </ListItem>
                <Divider variant="inset" component="li" />
                </div>
            ))}
        </List>

        <TablePagination
            component="div"
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={3}
            count={data.length}
            labelRowsPerPage={t('ProductInfo.tableRow')}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
  )
}

export default ReviewList