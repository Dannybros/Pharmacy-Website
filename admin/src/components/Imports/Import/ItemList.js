import React, {useState} from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import {Box, Card, Grid, CardMedia, CardContent, CardActions, Button, Typography} from '@mui/material'
import {Modal} from 'react-bootstrap'

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ItemList({items, setCart, cart}) {

    const [openPriceModal, setOpenPriceModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({});
    const [details, setDetails] = useState({price:"", amount:""});

    const handleOpenModal=async(item)=>{
        await setSelectedItem(item);
        setOpenPriceModal(true)
    }

    const handleCloseModal = ()=>{
        setSelectedItem({});
        setOpenPriceModal(false)
        setDetails({price:"", amount:""});
    }

    const handleOnChange=(e)=>{
        setDetails({...details, [e.target.name]:e.target.value})
    }
    
    function checkItemInCart(id){
        const index = cart.findIndex(prod => prod._id === id);
        if(index <0) return false
        return true
    }

    const handleAddBasket=(item)=>{
        if(details.price!=="" || details.amount!==""){
            const newItem = {_id:item._id, name:item.name.en, buyingPrice:parseInt(details.price) , importAmount:parseInt(details.amount) }
            setCart((cart)=>[...cart, newItem]);
            handleCloseModal();
        }else{
            alert("Please Fill In Price and Amount")
        }
    }
    
    const Item = ({item})=>{
        return(
            <StyledCard>
                <CardMedia
                    component="img"
                    height="100"
                    image={item.img}
                />
                <CardContent sx={{p:1, display:'flex', justifyContent:"space-between"}}>
                    <Typography gutterBottom variant="h7" component="div" className='import_item_title'>
                        <b>{item.name.en}</b>
                    </Typography>
                    <Typography variant="span" color="text.secondary">
                        {item.type.en}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" disabled={checkItemInCart(item._id)}  onClick={()=>handleOpenModal(item)}>Add</Button>
                </CardActions>
            </StyledCard>
        )
    }

    return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {items.map((item, index) => (
            <Grid item xs={2} md={3} key={index}>
                <Item item={item}/>
            </Grid>
            ))}
        </Grid>

        <Modal
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered
         onHide={handleCloseModal}
         show={openPriceModal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Import Detail
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <input type="number" name="price" className='form-control' value={details.price} onChange={handleOnChange} placeholder='Price'/>
                    </Grid>
                    <Grid item xs={6}>
                        <input type="number" name="amount" className='form-control' value={details.amount} onChange={handleOnChange} placeholder='Amount' />
                    </Grid>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='contained' color="error" onClick={handleCloseModal}>Close</Button>
                <Button variant='contained' onClick={()=>handleAddBasket(selectedItem)} sx={{mx:1}}>Add</Button>
            </Modal.Footer>
        </Modal>
    </Box>
  )
}

export default ItemList