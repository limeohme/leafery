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
import Error from '../../reusable-parts-components/Errors/Error';
import { cleanPathForDB, messageSetter } from '../../common/helpers';
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
  images: boolean;
  pinned: boolean;
}

export default function CreateLeaf () {
  const { context: { user } } = useContext(AppState);
  const [message, setMessage] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'bulletList', 'orderedList'],
      }),
    ],
    content: null,
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
    images: false,
    pinned: false
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Please enter the image\'s URL 😊');

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
      setNewLeaf({ ...newLeaf, leaf: editor?.getHTML(), images: true });
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const handleLeafSave = async (leaf: ILeaf) => {
    try {
      if (editor.isEmpty) {
        // eslint-disable-next-line no-throw-literal
        throw { message: 'Hey, your leaf is missing its content.' };
      }
      messageSetter(await createLeaf(leaf), setMessage);
    } catch (err: any) {
      console.error(err.message);
      messageSetter(err.message, setMessage);
    }
  };
  console.log(editor.getHTML());

  // const [isPublic, setIsPublic] = useState(false);
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
      <Button onClick={() => handleLeafSave(newLeaf)}>Save</Button>
      <Error message={message}></Error>
      <EditorContent editor={editor} onKeyUp={() => {
        const text = editor?.getText().slice(0, 25);
        setNewLeaf({ ...newLeaf, leaf: editor?.getHTML(), preview: text, id: `${newLeaf.author}-${newLeaf.createdOn}-${cleanPathForDB(text)}` });
      }} />
    </Box>
  );
}

