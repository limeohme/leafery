import { Box, Button, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { lightTheme } from '../../common/theme-colours';
import AppState from '../../providers/app-state';
import Error from '../../reusable-parts-components/Errors/Error';
import { signInUser } from '../../services/auth-service';
import { getUserByHandle, updateUserInfo } from '../../services/users-service';
import { validateLogForm } from './login-validations';

const textInputStyles = {
  my: 0.8, p: 1.5, boxSizing: 'border-box', bgcolor: 'transparent'
};

export default function Login () {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const { context, setContext } = useContext(AppState);
  const navigate = useNavigate();

  const handleLogin = async (form: {username: string, password: string}) => {
    try {
      validateLogForm(form);
      const user = await getUserByHandle(form.username);
      const email = user.val().email;
      await signInUser(email, form.password);
      updateUserInfo(form.username);
      setContext({ ...context, user: form.username });
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      if (err.message.includes('wrong-password')) {
        setMessage('Wrong password!');
      } else if (err.message.includes('user-not-found') || err.message.includes('path argument was an invalid path')) {
        setMessage('This user does not exist!');
      } else {
        setMessage(err.message);
      }
    }
  };
  return (
    <Box sx={{ m: '10vw', display: 'flex', flexDirection: 'column', bgcolor: '#b2da81', borderRadius: 2, border: '8px solid #528a47', p: 1 }}>
      <Error message={message}/>
      <TextField sx={textInputStyles} placeholder={'username'} onChange={(e) => setFormData({ ...formData, username: e.target.value })}/>
      <TextField sx={textInputStyles} type='password' placeholder={'password'} onChange={(e) => setFormData({ ...formData, password: e.target.value })}/>
      <Button  sx={{ color: lightTheme.txcolour, bgcolor: lightTheme.accent, width: 'fit-content', alignSelf: 'center' }}
        onClick={() => handleLogin(formData)}>Go!</Button>
      <br />
      <Link to={'/register'}>Not registered?</Link>
    </Box>
  );
}