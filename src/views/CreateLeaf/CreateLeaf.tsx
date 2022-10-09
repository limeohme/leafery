import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import './create-leaf-styles.scss';
import EditorMenu from '../../quasidumb-components/EditorMenu/EditorMenu';
import { txtTheme } from '../../common/theme-colours';
// import { useState } from 'react';
// import { lightTheme } from '../../common/theme-colours';

export default function CreateLeaf () {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'bulletList', 'orderedList'],
      }),
    ],
    content: '',
  });
  // const [isPublic, setIsPublic] = useState(false);
  console.log(editor?.getJSON());
  return (
    <Box sx={{ my: '5vh', flexWrap: 'wrap' }}>
      <Grid container direction='row' justifyContent={'space-between'}>
        <Grid item xs={12} sm={12} md={3}><Typography variant='h2' sx={{ fontFamily: txtTheme.titleFont, ml: 3 }}>New 🍁</Typography></Grid>
        <Grid item xs={12} sm={12} md={9} alignItems='center'><EditorMenu editor={editor} /></Grid>

      </Grid>
      <br/>
      <TextField placeholder='title here.' variant='standard' sx={{ mx:2, bgcolor: '#d4f1af', borderRadius: 1, pl: 1, alignSelf: 'start' }}></TextField>
      {/* <FormControlLabel 
        control={<Checkbox sx={{ color: lightTheme.accent }} checked={isPublic} onChange={() => setIsPublic(!isPublic)}/>}
        label="Post to public leafery" /> */}
      <Button>Save</Button>
      <EditorContent editor={editor} />
    </Box>
  );
}

