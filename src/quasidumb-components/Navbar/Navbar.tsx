import { Avatar, Grid } from '@mui/material';
import {  } from 'react-router-dom';
import {  } from '../../reusable-parts-components/Buttons/Button';
import { MaterialUISwitch } from '../../reusable-parts-components/Switch/Switch';
import DropMenu from '../DropMenu/DropMenu';
import { navbarStyle } from './navbar-style';

export default function Navbar () {
  return (
    <Grid container sx={navbarStyle}>
      <Avatar />
      <DropMenu/>
      <MaterialUISwitch/>
    </Grid>
  );
}