import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Menu from './Menu';

const drawerWidth = 240;

function SideBar({container, mobileOpen, handleDrawerToggle}) {
  return (
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { msFlexDirection: 0 }, zIndex:200 }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: 'block', md: 'none'},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth},
          }}
        >
          <Menu/>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
        <Menu/>
        </Drawer>
      </Box>
  );
}


export default SideBar;
