import { Box, Paper, Typography } from '@mui/material';
import { useContext } from 'react';
import { darkTheme, lightTheme, txtTheme } from '../../common/theme-colours';
import AppState from '../../providers/app-state';
import { ILeaf } from '../../services/leaf-service';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface SimpleLeafProps {
    leaf: ILeaf;
}
export default function SimpleLeafView ({ leaf }: SimpleLeafProps) {
  const { context: { theme } } = useContext(AppState);
  return (
    <Paper sx={{ 
      bgcolor: theme !=='dark'? lightTheme.bgcolour:darkTheme.bgcolour, 
      color: theme !=='dark'? lightTheme.txcolour:darkTheme.txcolour,
      fontFamily: txtTheme.font,
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      gap: 2,
      border: `2px solid ${theme ==='dark'? darkTheme.navcolour:darkTheme.bgcolour}`,
      boxShadow: `5px 5px ${theme ==='dark'? `${darkTheme.navcolour}80`:'#00000090'}`
    }}>
      {leaf.title?<Typography variant='h6'>{leaf.title}</Typography> : null}
      <Typography variant='body1'>{leaf.preview}...</Typography>
      <Typography variant='caption'>{leaf.createdOn}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <PushPinIcon aria-label='add to pinned leaves' sx={{ cursor: 'pointer', '&:hover': { color: lightTheme.accent } }}></PushPinIcon>
        <EditIcon aria-label='edit leaf' sx={{ cursor: 'pointer', '&:hover': { color: lightTheme.accent } }}/>
        <DeleteIcon aria-label='delete-leaves' sx={{ cursor: 'pointer', '&:hover': { color: lightTheme.accent } }}/>
      </Box>
    </Paper>
  );
}