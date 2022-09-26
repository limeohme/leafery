import { Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { lightTheme } from '../../common/theme-colours';

export default function Login () {

  const textInputStyles = {
    my: 0.8, p: 1.5, boxSizing: 'border-box', bgcolor: 'transparent'
  };

  return (
    <Box sx={{ m: '10vw', display: 'flex', flexDirection: 'column', bgcolor: '#b2da81', borderRadius: 2, border: '8px solid #528a47', p: 1 }}>
      <TextField sx={textInputStyles} placeholder={'email'} onChange={(e) => console.log(e)}/>
      <TextField sx={textInputStyles} type='password' placeholder={'password'} onChange={(e) => console.log(e)}/>
      <Button  sx={{ color: lightTheme.txcolour, bgcolor: lightTheme.accent, width: 'fit-content', alignSelf: 'center' }}>Go!</Button>
      <br />
      <Link to={'/register'}>Not registered?</Link>
    </Box>
  );
}