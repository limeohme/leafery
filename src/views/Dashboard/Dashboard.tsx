import Masonry from '@mui/lab/Masonry';
import { Box, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { darkTheme, lightTheme, txtTheme } from '../../common/theme-colours';
import AppState from '../../providers/app-state';
import SimpleLeafView from '../../quasidumb-components/LeafComponents/SimpleLeafView';
import { getLeaves } from '../../services/leaf-service';
import AddCircleIcon from '@mui/icons-material/AddCircle';
interface ILeaf {
  leaf: string | undefined;
  preview: string;
  title: string;
  author: string;
  id: string;
  likes: number;
  dislikes: number;
  comments: string[];
  public: boolean;
  createdOn: string;
  editedOn: string;
  images: boolean;
  pinned: boolean;
}

export default function Dashboard () {

  const { context: { user, theme } } = useContext(AppState);
  
  const [leaves, setLeaves] = useState <ILeaf[]>([]);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {    
    (async () => {
      setLeaves(await getLeaves(user));
    })();
  }, [trigger]);

  return (
    <Box sx={{ width: '80vw', minHeight: 393, boxSizing: 'border-box', my: 4, fontSize: '44pt' }}>
      <Typography variant='h3' sx={{ fontFamily: txtTheme.titleFont, fontWeight: 600 }}>Pinned</Typography>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
        {leaves.length? leaves.filter(l => l.pinned)
          .sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn))
          .map((leaf: ILeaf) => <SimpleLeafView setTrigger={setTrigger} trigger={trigger} key={leaf.id} leaf={leaf}></SimpleLeafView>): <></>}
      </Masonry>
      <Typography variant='h3' sx={{ fontFamily: txtTheme.titleFont, fontWeight: 600 }}>All leaves</Typography>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
        <Paper sx={{ 
          bgcolor: theme !=='dark'? lightTheme.bgcolour:darkTheme.bgcolour, 
          color: theme !=='dark'? lightTheme.txcolour:darkTheme.txcolour,
          fontFamily: txtTheme.font,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 2,
          border: `2px solid ${theme ==='dark'? darkTheme.navcolour:darkTheme.bgcolour}`,
          boxShadow: `5px 5px ${theme ==='dark'? `${darkTheme.navcolour}80`:'#00000090'}`,
          textDecoration: 'none',
          '&:hover': { color: lightTheme.accent } 
        }}
        component={Link} to={'/create-leaf'}>
          <Typography variant='h5'>Create new leaf 🍁</Typography>
          <AddCircleIcon fontSize='large'/>
        </Paper>
        {leaves.length? leaves.filter(l => !l.pinned)
          .sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn))
          .map((leaf: ILeaf) => <SimpleLeafView setTrigger={setTrigger} trigger={trigger} key={leaf.id} leaf={leaf}></SimpleLeafView>): <></>}
      </Masonry>
    </Box>
  );
}


