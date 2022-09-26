import { Button } from '@mui/material';

type ButtonProps = {
    style?: object;
    component?: any;
    to?: string;
    innerText: string;
    onClick?: () => void;
}

export function CustomizableButton (props: ButtonProps) {
  return (
    <Button component={props.component || null} to={props.to || null} sx={props.style || null}>{props.innerText}</Button>
  );
} 