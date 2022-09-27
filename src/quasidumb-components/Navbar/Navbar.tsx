import { Avatar, Grid } from '@mui/material';
import { useContext } from 'react';
import {  } from 'react-router-dom';
import AppState from '../../providers/app-state';
import {  } from '../../reusable-parts-components/Buttons/Button';
import { MaterialUISwitch } from '../../reusable-parts-components/Switch/Switch';
import DropMenu from '../DropMenu/DropMenu';
import { navbarStyle } from './navbar-style';

export default function Navbar () {
  const { context: { theme, user }, setContext } = useContext(AppState);
  return (
    <Grid container sx={navbarStyle}>
      <Avatar />
      <DropMenu/>
      <MaterialUISwitch onClick={() => theme === 'dark'? setContext({ user, theme: 'light' }) : setContext({ user, theme: 'dark' }) }/>
    </Grid>
  );
}