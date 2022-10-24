import { Box } from '@mui/material';

interface FoldableProps {
    children: any;
    open: Boolean;
}

export default function Foldable ({ children, open }: FoldableProps) {
  if (!open) {
    return (
      <Box sx={{ height: '42px' }}></Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', height: '42px' }}>
      {children}
    </Box>
  );
}