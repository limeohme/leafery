import { Avatar, Grid } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppState from '../../providers/app-state';
import {  } from '../../reusable-parts-components/Buttons/Button';
import { MaterialUISwitch } from '../../reusable-parts-components/Switch/Switch';
import CustomTooltip from '../../reusable-parts-components/Tooltip/Tooltip';
import DropMenu from '../DropMenu/DropMenu';
import { navbarStyle } from './navbar-style';

export default function Navbar () {
  const { context: { theme, user }, setContext } = useContext(AppState);
  
  return (
    <Grid container direction={'row'} wrap={'wrap'} sx={navbarStyle}>
      <Grid item xs={4} sm={8} md={9} lg={10.5} sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar component={Link} to={'/'} sx={{ width: 56, height: 56 }} alt='logo' src={require('../../images/android-chrome-512x512.png')}/>
      </Grid>
      <Grid item xs={4} sm={2} md={1.5} lg={0.75} sx={{ display: 'flex', justifyContent: 'center' }}><DropMenu/></Grid>
      <Grid item xs={4} sm={2} md={1.5} lg={0.75} sx={{ display: 'flex', justifyContent: 'end' }}>
        <CustomTooltip title='theme switch'>
          <MaterialUISwitch style={{ justifySelf: 'end' }} onClick={() => theme === 'dark'? setContext({ user, theme: 'light' }) : setContext({ user, theme: 'dark' }) }/>
        </CustomTooltip>
      </Grid>
    </Grid>
  );
}