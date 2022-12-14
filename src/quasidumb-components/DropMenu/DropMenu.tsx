import { KeyboardDoubleArrowDown } from '@mui/icons-material';
import { Box, Button, Menu, MenuItem, MenuList } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { darkTheme, txtTheme } from '../../common/theme-colours';
import AppState from '../../providers/app-state';
import { signOutUser } from '../../services/auth-service';
import { removeUserFromStorage } from '../../services/users-service';


function DropMenu () {
  const [anchor, setAnchor] = useState(null);
  const { context: { user, theme }, setContext } = useContext(AppState);
  const open = Boolean(anchor);
  const handleClick = (event: any) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      removeUserFromStorage();
      setContext({ theme, user: '' });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box sx={{ alignSelf: 'center', fontFamily: txtTheme.font }}>
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
        sx={{ color: darkTheme.bgcolour }}
      >Navigate</Button>
      
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
          width: 1, top: 0, left: 0, }}
      > <MenuList  sx={{ width: '8rem' }}>
          {user? <MenuList sx={{ width: '8rem' }}><MenuItem component={Link} to='/dashboard'>Dashboard</MenuItem>
            <MenuItem sx={{ fontFamily: txtTheme.font }} component={Link} to='/whiteboard'>Whiteboard</MenuItem>
            <MenuItem sx={{ fontFamily: txtTheme.font }} component={Link} to='/profile'>Profile</MenuItem></MenuList> : null
          }
          <MenuItem sx={{ fontFamily: txtTheme.font }} component={Link} to='/walkthrough'>Walkthrough</MenuItem>
          <MenuItem sx={{ fontFamily: txtTheme.font }} component={Link} to='/'>Home</MenuItem>
          {user?<MenuItem sx={{ fontFamily: txtTheme.font }} component={Link} to='/' onClick={handleLogout}>Logout</MenuItem>
            : <MenuItem sx={{ fontFamily: txtTheme.font }} component={Link} to='/login'>Login</MenuItem>}
        </MenuList>
      </Menu>
    </Box>
    
  );
}

export default DropMenu;
