import { Grid, Typography, Card, CardMedia } from '@mui/material';
import { darkTheme, lightTheme, txtTheme } from '../../common/theme-colours';
import AppState from '../../providers/app-state';
import Title from '../../reusable-parts-components/Title/Title';
import { useContext } from 'react';

export default function Landing () {
  const { context: { theme } } = useContext(AppState);
  
  return (
    <Grid container direction={'row'} gap={3} sx={{ width: '80%', minWidth: '320px', padding: '5vh', justifyContent: 'space-between' }}>
      <Grid item container direction={'column'} lg={4.5} sm={12} sx={{ justifyContent: 'space-between', }}>
        <Grid item><Title text='Leafery 🌿'></Title></Grid>
        <Grid item 
          sx={{
            bgcolor: theme === 'dark'? '#fff': darkTheme.bgcolour, 
            p: '25px', boxSizing: 'border-box', 
            borderRadius: 10, 
            boxShadow: theme === 'dark'? `5px 5px #FFFFFF40` : `5px 5px #00000040` }}>
          <Typography variant='body1' sx={{ fontFamily: txtTheme.font, color: theme === 'dark'? lightTheme.txcolour: darkTheme.txcolour }}>
        I arrived at my grandparents' place at dusk. It was mid-December and the air was cold, and crisp, and it had that particular wintery smell.
        The sky was blue, not yet black, the night had not yet fallen completely. I looked around at the buildings around me;
        
         There were many lit windows and they seemed like candles in the darkness. I looked at our balcony:
          There were some freshly washed clothes hanging on the ropes, behind them you could see the light of the lamp in the living room.
          The green building seemed gray in the dark. I hurried to the entrance filled with excitement and quiet happiness.
          </Typography>
        </Grid>
      </Grid>
      <Grid item lg={7} sm={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ backgroundColor: 'transparent', p: 2, }} elevation={0}>
          <CardMedia
            component="img"
            height={'700vh'}
            image={require('../../images/catonwindowmemeAPPS.png')}
            alt="penguin"
            sx={{ objectFit: 'scale-down' }}
          />
        </Card>

      </Grid>
    </Grid>
  );
}
