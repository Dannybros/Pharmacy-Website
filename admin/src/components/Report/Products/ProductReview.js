import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap'
import {List, ListItem , ListItemAvatar,  ListItemText, Typography, TablePagination, Avatar, Divider, Rating} from '@mui/material'
import axios from '../../axios'

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

function ProductReview({modalShow, setModalShow}) {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchReview=async()=>{
          if(modalShow.id==="") return null
          await axios.post('/review/get/all-review', {reviewTo:modalShow.id})
          .then(res=>{
            setReviews(res.data.data)
          })
          .catch(err=>{
              console.log(err);
          })
        }
        fetchReview()
    }, [modalShow])
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const handleCloseModal = ()=>{
        setModalShow({state:false, id:""});
    }

  return (
    <Modal
        show={modalShow.state}
        onHide={handleCloseModal}
        size="lg"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Reviews
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {(rowsPerPage > 0
                    ? reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : reviews
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
                count={reviews.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ProductReview