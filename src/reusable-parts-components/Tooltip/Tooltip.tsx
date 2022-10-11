import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { darkTheme } from '../../common/theme-colours';

interface Props {
    title: string;
    children: any;
}


export const CustomTooltip = styled(({ ...props }: Props) =>  (
  <Tooltip arrow={true} {...props}/>
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: darkTheme.navcolour
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: darkTheme.bgcolour
  },
}));

export default CustomTooltip;
