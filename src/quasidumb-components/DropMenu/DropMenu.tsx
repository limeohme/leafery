import { KeyboardDoubleArrowDown } from '@mui/icons-material';
import { Box, Button, Menu, MenuItem, MenuList } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import AppState from '../../../providers/app-state';
// import SignOut from '../SignOut/SignOut';


function DropMenu () {
  const [anchor, setAnchor] = useState(null);
  //   const { appState: { user } } = useContext(AppState);
  const open = Boolean(anchor);
  const handleClick = (event: any) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  return (
    <Box sx={{ alignSelf: 'end' }}>
      <Button
        id="drop-menu-button"
        aria-controls={open ? 'drop-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        size="large"
        variant="text"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardDoubleArrowDown />}
      >{''}</Button>
      
      <Menu
        
        id='drop-menu'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'drop-menu-button',
        }}
        anchorEl={anchor}
        open={open}
        onClick={handleClose}
        sx={{ maxHeight: 1,
          width: 1, top: 0, left: 0 }}
      > <MenuList  sx={{ width: '8rem' }}>
          <MenuItem component={Link} to='/'>Home</MenuItem>
          <MenuItem component={Link} to='/dashboard'>Dashboard</MenuItem>
          <MenuItem component={Link} to='/whiteboard'>Whiteboard</MenuItem>
          <MenuItem component={Link} to='/walkthrough'>Walkthrough</MenuItem>
          <MenuItem component={Link} to='/profile'>Profile</MenuItem>
          <MenuItem component={Link} to='/login'>Login</MenuItem>
          {/* <MenuItem><SignOut/></MenuItem> */}
        </MenuList>
      </Menu>
    </Box>
    
  );
}

export default DropMenu;
