import { Box } from '@mui/material';

interface FoldableProps {
    children: any;
    open: Boolean;
}

export default function Foldable ({ children, open }: FoldableProps) {
  if (!open) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', }}>
      {children}
    </Box>
  );
}