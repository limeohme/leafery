import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useEditor, EditorContent } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import './create-leaf-styles.scss';
import EditorMenu from '../../quasidumb-components/EditorMenu/EditorMenu';
import { txtTheme } from '../../common/theme-colours';
import { useCallback, useContext, useState } from 'react';
import AppState from '../../providers/app-state';
import Image from '@tiptap/extension-image';
import { createLeaf } from '../../services/leaf-service';
// import { useState } from 'react';
// import { lightTheme } from '../../common/theme-colours';

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
}

export default function CreateLeaf () {
  const { context: { user } } = useContext(AppState);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'bulletList', 'orderedList'],
      }),
    ],
    content: '',
  });

  const [newLeaf, setNewLeaf] = useState<ILeaf>({
    leaf: '',
    preview: '',
    title: '',
    author: user,
    id: '',
    likes: 0,
    dislikes: 0,
    comments: [],
    public: false,
    createdOn: new Date().toLocaleDateString().split('/').join('-'),
    editedOn: '',
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Please enter the image\'s URL 😊');

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  // const [isPublic, setIsPublic] = useState(false);
  console.log(editor?.getJSON());
  return (
    <Box sx={{ my: '5vh', flexWrap: 'wrap' }}>
      <Grid container direction='row' justifyContent={'space-between'}>
        <Grid item xs={12} sm={12} md={3}><Typography variant='h2' sx={{ fontFamily: txtTheme.titleFont, ml: 3 }}>New 🍁</Typography></Grid>
        <Grid item xs={12} sm={12} md={9} alignItems='center'><EditorMenu editor={editor} addImage={addImage}/></Grid>
      </Grid>
      <br/>
      <TextField placeholder='title here.' variant='standard' 
        sx={{ mx:2, bgcolor: '#d4f1af', borderRadius: 1, pl: 1, alignSelf: 'start' }}
        onChange={(e) => setNewLeaf({ ...newLeaf, title: e.target.value })}
      ></TextField>
      {/* <FormControlLabel 
        control={<Checkbox sx={{ color: lightTheme.accent }} checked={isPublic} onChange={() => setIsPublic(!isPublic)}/>}
        label="Post to public leafery" /> */}
      <Button onClick={() => {                                
        if (newLeaf.leaf && newLeaf.id) createLeaf(newLeaf);
      }}>Save</Button>
      <EditorContent editor={editor} onKeyUp={() => {
        const text = JSON.parse(JSON.stringify(editor?.getJSON() || [])).content[0].content[0].text.slice(0, 15);
        setNewLeaf({ ...newLeaf, leaf: editor?.getHTML(), preview: text, id: `${newLeaf.author}-${newLeaf.createdOn}-${text}` });
      }} />
    </Box>
  );
}

