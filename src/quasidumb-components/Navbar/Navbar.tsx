import { Avatar, Grid } from '@mui/material';
import { useContext } from 'react';
import AppState from '../../providers/app-state';
import {  } from '../../reusable-parts-components/Buttons/Button';
import { MaterialUISwitch } from '../../reusable-parts-components/Switch/Switch';
import DropMenu from '../DropMenu/DropMenu';
import { navbarStyle } from './navbar-style';

export default function Navbar () {
  const { context: { theme, user }, setContext } = useContext(AppState);
  
  return (
    <Grid container direction={'row'} wrap={'wrap'} sx={navbarStyle}>
      <Grid item xs={4} sm={8} md={9} lg={10.5} sx={{ display: 'flex', justifyContent: 'start' }}><Avatar/></Grid>
      <Grid item xs={4} sm={2} md={1.5} lg={0.75} sx={{ display: 'flex', justifyContent: 'center' }}><DropMenu/></Grid>
      <Grid item xs={4} sm={2} md={1.5} lg={0.75} sx={{ display: 'flex', justifyContent: 'end' }}>
        <MaterialUISwitch style={{ justifySelf: 'end' }} onClick={() => theme === 'dark'? setContext({ user, theme: 'light' }) : setContext({ user, theme: 'dark' }) }/></Grid>
    </Grid>
  );
}