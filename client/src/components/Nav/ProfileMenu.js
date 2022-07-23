import React from 'react'
import { Tooltip, IconButton, Menu, Avatar, MenuItem, Box, ListItemIcon, Divider, Typography} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {useNavigate} from 'react-router-dom'

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
        height:30,
        width:30,
        fontSize:16,
      },
      children: `${name.substring(0, 2)}`,
    };
  }

function ProfileMenu({user, handleLogOut}) {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const userName = Object.keys(user).length !== 0? user.username : "Guest"

    return (
    <div className='user_box' style={{ display: 'flex', flexDirection:"column", alignItems: 'center', justifyContent:"center", textAlign: 'center' }}>
        <Box >
            <Tooltip title="Account settings">
                <IconButton
                  sx={{p:0}}
                    onClick={handleClick}
                    size="small"
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                <Avatar className="pfp_icon" {...stringAvatar(userName)}/>
            </IconButton>
            </Tooltip>
      </Box>
      <Typography component="p">{userName}</Typography>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      {Object.keys(user).length !== 0?
        
        <>
        <MenuItem>
            <Typography sx={{fontSize:15}}>ID : {user?._id}</Typography>
        </MenuItem>
        <MenuItem>
         <Typography sx={{fontSize:15}}>Name : {user?.username}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={()=>navigate('/user')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> 
        </>
        :
        <MenuItem onClick={()=>navigate('/user')} >
            <ListItemIcon>
              <PersonOutlineIcon fontSize="small" />
            </ListItemIcon>
            Sign Up
        </MenuItem>
      }
      </Menu>
    </div>
    )
}

export default ProfileMenu