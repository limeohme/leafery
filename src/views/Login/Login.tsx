import { Box } from '@mui/material';
import SimpleTextInput from '../../reusable-parts-components/Inputs/SimpleTextInput';

export default function Login () {

  return (
    <Box sx={{ m: '10vw', display: 'flex', flexDirection: 'column', bgcolor: '#b2da81', borderRadius: 2, border: '8px solid #528a47' }}>
      <SimpleTextInput placeholder={'email'} onChange={(e) => console.log(e)}/>
      <SimpleTextInput placeholder={'password'} onChange={(e) => console.log(e)}/>
      <SimpleTextInput placeholder={'password again...'} onChange={(e) => console.log(e)}/>
    </Box>
  );
}