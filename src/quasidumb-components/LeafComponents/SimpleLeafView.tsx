import { Box, Paper, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { darkTheme, lightTheme, txtTheme } from '../../common/theme-colours';
import AppState from '../../providers/app-state';
import { deleteLeaf, ILeaf } from '../../services/leaf-service';
import PushPinIcon from '@mui/icons-material/PushPin';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface SimpleLeafProps {
    leaf: ILeaf;
    setTrigger:  React.Dispatch<React.SetStateAction<boolean>>;
    trigger: boolean;
}
export default function SimpleLeafView ({ leaf, setTrigger, trigger }: SimpleLeafProps) {
  const { context: { theme } } = useContext(AppState);
  const navigate = useNavigate();
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
      {leaf.title?<Typography variant='h6'>{leaf.title.slice(0, 15)}...</Typography> : null}
      <Typography variant='body1'>{leaf.preview}...</Typography>
      {leaf.editedOn? <Typography variant='caption'>Last edit: {leaf.editedOn}</Typography>: null}
      <Typography variant='caption' sx={{ opacity: leaf.editedOn? '80%': '100%' }}>Date created: {leaf.createdOn}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <PushPinIcon aria-label='add to pinned leaves' sx={{ cursor: 'pointer', '&:hover': { color: lightTheme.accent } }}></PushPinIcon>
        <EditIcon aria-label='edit leaf' sx={{ cursor: 'pointer', '&:hover': { color: lightTheme.accent } }}
          onClick={() => navigate(`/detailed-leaf/:${leaf.id}`)}
        />
        <DeleteIcon aria-label='delete-leaves' sx={{ cursor: 'pointer', '&:hover': { color: lightTheme.accent } }} 
          onClick={() => {
            deleteLeaf(leaf.author, leaf.id);
            setTrigger(!trigger);

          }} />
      </Box>
    </Paper>
  );
}