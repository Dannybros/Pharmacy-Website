import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Toast, ToastContainer} from 'react-bootstrap'
import axios from '../axios'
import {useNavigate} from 'react-router-dom'
import { useStateValue } from '../../context/StateProvider';

const theme = createTheme();

const mystyle = {
    position: "fixed",
    top:0,
    left:0,
    height:'100vh',
    width:'100vw',
    display:'flex',
    alignItems:'center',
    zIndex:500,
    background:"grey"
};

export default function SignIn() {

    const [{user}, dispatch] = useStateValue();
    
    const navigate = useNavigate();

    const [showToast, setShowToast] = React.useState({state:false, header:"", message:""});

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        axios.post('/user/admin/login', {username:data.get('name'), password: data.get('password'),})
        .then(async(res)=>{
            await dispatch({
                type:"ADD_USER",
                token:res.data.token
            })
            navigate('../', { replace: true });
        })
        .catch((error)=>{
            setShowToast({state:true, header:"Warning", message:error.response.data.message})
        })
    };

    const ThrowToast = ()=>{
        return(
        <Toast onClose={() => setShowToast({...showToast, state:false})} show={showToast.state} bg="Warning" delay={5000} autohide>
            <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">{showToast.header}</strong>
            <small className="text-muted ">just now</small>
            </Toast.Header>
            <Toast.Body className='text-uppercase'>{showToast.message}</Toast.Body>
        </Toast>
        )
    }

  return (
    <ThemeProvider theme={theme}>
        <div style={mystyle}>
        <ToastContainer position="top-center" className="p-3">
            <ThrowToast/>
        </ToastContainer>

        <Container component="main" maxWidth="xs" sx={{p:3, bgcolor: 'common.white'}} obj={user}>
            <CssBaseline />
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="username"
                autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                
            </Box>
            </Box>
        </Container>
        </div>
    </ThemeProvider>
  );
}