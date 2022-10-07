import { Typography } from '@mui/material';
import { errStyle } from './error-style';

interface ErrProps {
    message: string;
}

export default function Error ({ message }: ErrProps) {
  return <Typography variant='body2' sx={errStyle}>{message}</Typography>;
}