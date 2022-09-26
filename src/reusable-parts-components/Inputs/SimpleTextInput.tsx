import { TextField } from '@mui/material';
import React from 'react';

type InputProps = {
    placeholder: string;
    type?: string;
    // eslint-disable-next-line no-unused-vars

}

export default function SimpleTextInput (props: InputProps) {
  return (
    <TextField type={props.type || 'text'} placeholder={props.placeholder}
      sx={{ my: 0.8, p: 1.5, boxSizing: 'border-box', bgcolor: 'transparent' }} />
  );
}
