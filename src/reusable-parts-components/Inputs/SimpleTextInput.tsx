import { TextField } from '@mui/material';
import React from 'react';

type InputProps = {
    placeholder: string;
    type?: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (input: string) => void;

}

export default function SimpleTextInput (props: InputProps) {
  return (
    <TextField type={props.type || 'text'} placeholder={props.placeholder}
      onChange={(event) => props.onChange(event.target.value)}
      sx={{ my: 1, p: 2, boxSizing: 'border-box' }} />
  );
}
