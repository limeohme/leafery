import Masonry from '@mui/lab/Masonry';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Dashboard () {
  return (
    <Box sx={{ width: '80vw', minHeight: 393 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
        <Button component={Link} to={'/create-leaf'}>Create new leaf</Button>
      </Masonry>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
      </Masonry>
    </Box>
  );
}


