import Masonry from '@mui/lab/Masonry';
import { Box, Button, Paper } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { darkTheme, lightTheme, txtTheme } from '../../common/theme-colours';
import AppState from '../../providers/app-state';
import SimpleLeafView from '../../quasidumb-components/LeafComponents/SimpleLeafView';
import { getLeaves } from '../../services/leaf-service';

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

  useEffect(() => {    
    (async () => {
      setLeaves(await getLeaves(user));
    })();
  }, []);

  return (
    <Box sx={{ width: '80vw', minHeight: 393, boxSizing: 'border-box', my: 4 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
      </Masonry>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
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
        }}
        component={Link} to={'/create-leaf'}>
          <Button>Create new leaf</Button>
        </Paper>
        {leaves.length? leaves.map((leaf: ILeaf) => <SimpleLeafView key={leaf.id} leaf={leaf}></SimpleLeafView>): <></>}
      </Masonry>
    </Box>
  );
}


