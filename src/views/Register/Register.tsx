import { Box, Button, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { lightTheme } from '../../common/theme-colours';
import AppState from '../../providers/app-state';
import { registerUser } from '../../services/auth-service';
import { createUserHandle, updateUserInfo } from '../../services/users-service';
import { defaultUserData } from './userData';
import { validations } from './validateRegister';

const textInputStyles = {
  my: 0.8, p: 1.5, boxSizing: 'border-box', bgcolor: 'transparent'
};

export default function Register () {
  const { context: { user, theme }, setContext } = useContext(AppState);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
    passCheck: '' 
  });
  const [btnPosition, setBtnPosition] = useState('center');
  const [errMsg, setErrMsg] = useState('');
  // eslint-disable-next-line consistent-return
  async function handleRegister () {
    try {
      setContext({ user, theme });
      await validations(formData);
      await registerUser(formData.email, formData.pass);
      createUserHandle(formData.name, { ...defaultUserData, username: formData.name, email: formData.email });
      updateUserInfo(formData.name);
      setErrMsg('Success!');
    } catch (err: any) {
      if (err.message.includes('auth/email-already-in-use')) return setErrMsg('This email has already been registered!');
      setErrMsg(err.message);
    }
  } 

  // eslint-disable-next-line consistent-return
  const checkIfInvalid = () => {
    try {
      validations(formData);
      setErrMsg('');
    } catch (err: any) {
      if (err.message.includes('auth/email-already-in-use')) return setErrMsg('This email has already been registered!');
      setErrMsg(err.message);      
    }
  }; 

  return (
    <Box sx={{ m: '10vw', display: 'flex', flexDirection: 'column', 
      bgcolor: '#b2da81', borderRadius: 2, border: '8px solid #528a47', p: 1 }}>
      <Typography variant='body1'>{errMsg}</Typography>
      <TextField type='text' placeholder={'username'} sx={textInputStyles}
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
          checkIfInvalid();
        }}/>
      <TextField sx={textInputStyles} placeholder={'email'} onChange={(e) => {
        setFormData({ ...formData, email: e.target.value });
        checkIfInvalid(); 
      }}/>
      <TextField sx={textInputStyles} type='password' placeholder={'password'} 
        onChange={(e) => {
          setFormData({ ...formData, pass: e.target.value });
          checkIfInvalid();
        }}/>
      <TextField sx={textInputStyles} type='password' placeholder={'password again...'}
        onChange={(e) => {
          setFormData({ ...formData, passCheck: e.target.value });
          checkIfInvalid();
        }}/>

      <Button 
        sx={{ color: lightTheme.txcolour, bgcolor: lightTheme.accent, width: 'fit-content', alignSelf: btnPosition }}
        onMouseEnter={() => {
          if (errMsg) {
            btnPosition === 'center'? setBtnPosition('end'): setBtnPosition('center');
          }
        } }
        onClick={handleRegister}
      >Go!</Button>
      <br />
      <Link to={'/login'}>Already registered?</Link>
    </Box>
  );
}