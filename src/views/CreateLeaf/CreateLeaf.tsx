import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { useEditor, EditorContent, generateJSON } from '@tiptap/react';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import './create-leaf-styles.scss';
import EditorMenu from '../../quasidumb-components/EditorMenu/EditorMenu';
import { lightTheme, txtTheme } from '../../common/theme-colours';
import { useCallback, useContext, useEffect, useState } from 'react';
import AppState from '../../providers/app-state';
import Image from '@tiptap/extension-image';
import { createLeaf, getLeafByID } from '../../services/leaf-service';
import Error from '../../reusable-parts-components/Errors/Error';
import { cleanPathForDB, dateFormatter, messageSetter } from '../../common/helpers';
import { useParams } from 'react-router-dom';

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
  const { context: { user, theme } } = useContext(AppState);
  const { leafID } = useParams();
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);
  const editable = leafID? edit: true;
  const [currentLeaf, setLeaf] = useState<ILeaf>({
    leaf: '',
    preview: '',
    title: '',
    author: user,
    id: '',
    likes: 0,
    dislikes: 0,
    comments: [],
    public: false,
    createdOn: dateFormatter(new Date()),
    editedOn: '',
    images: false,
    pinned: false
  });
  const [message, setMessage] = useState('');
  const editor = useEditor({
    editable,
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'bulletList', 'orderedList'],
      }),
    ],
    content: title
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
    createdOn: dateFormatter(new Date()),
    editedOn: leafID? dateFormatter(new Date()): '',
    images: false,
    pinned: false
  });

  useEffect(() => {
    (async function () {
      if (leafID) {
        var leaf = await getLeafByID(user, leafID.replace(':', ''));
        setTitle(leaf.title);
        setLeaf(leaf);
        const json = generateJSON(leaf.leaf, [StarterKit,
          Image,
          TextAlign.configure({
            types: ['heading', 'paragraph', 'bulletList', 'orderedList'],
          }),]);
        editor?.commands.setContent(json);
      }
    })();

  }, [editor]);
  
  useEffect(() => {
    editor?.setEditable(editable);
  }, [editable, editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('Please enter the image\'s URL ????');

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
      if (!leafID) {
        setNewLeaf({ ...newLeaf, leaf: editor?.getHTML(), images: true });
      } else {
        setLeaf({ ...currentLeaf, leaf: editor?.getHTML(), images: true });
      }
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
  // const [isPublic, setIsPublic] = useState(false);
  return (
    <Box sx={{ my: '5vh', flexWrap: 'wrap', fontFamily: txtTheme.font }}>
      {leafID && !edit? <Typography variant='h2' 
        sx={{ fontFamily: txtTheme.titleFont, ml: 3 }}>{currentLeaf.title}</Typography> :
        <Grid container direction='row' justifyContent={'space-between'}>
          <Grid item xs={12} sm={12} md={4}><Typography variant='h2' 
            sx={{ fontFamily: txtTheme.titleFont, ml: 3 }}>{leafID? `${currentLeaf.title.slice(0, 10)}...` : 'New ????'}</Typography></Grid>
          <Grid item xs={12} sm={12} md={8} alignItems='center'><EditorMenu editor={editor} addImage={addImage}/></Grid>
        </Grid>}
      <br/>
      <TextField placeholder='title here.' variant='standard' value={leafID? currentLeaf.title : newLeaf.title}
        disabled={leafID? !edit: false}
        sx={{ mx:2, bgcolor: theme === 'dark'? '#FFF' : 'transparent', borderRadius: 1, pl: 1, alignSelf: 'start' }}
        onChange={(e) => {
          if (!leafID) {
            setNewLeaf({ ...newLeaf, title: e.target.value });
          } else {
            setLeaf({ ...currentLeaf, title: e.target.value, editedOn: dateFormatter(new Date()) });
          }
        }}
      ></TextField>
      {/* <FormControlLabel 
        control={<Checkbox sx={{ color: lightTheme.accent }} checked={isPublic} onChange={() => setIsPublic(!isPublic)}/>}
        label="Post to public leafery" /> */}
      {leafID? <FormControlLabel
        control={<Checkbox aria-label='checkbox edit' sx={{ color: lightTheme.accent }} value={edit} onChange={(event) => setEdit(event.target.checked)}/>}
        label="Edit?" />: null}
      {leafID && !edit? null: <Button onClick={() => leafID? handleLeafSave(currentLeaf) : handleLeafSave(newLeaf)}>Save</Button>}
      <Error message={message}></Error>
      <EditorContent editor={editor} onKeyUp={() => {
        const text = editor?.getText().slice(0, 25);
        if (!leafID) {
          setNewLeaf({ ...newLeaf, leaf: editor?.getHTML(), preview: text, id: `${newLeaf.author}-${cleanPathForDB(newLeaf.createdOn)}-${cleanPathForDB(text)}` });
        } else {
          setLeaf({ ...currentLeaf, leaf: editor.getHTML(), preview: text, editedOn: dateFormatter(new Date()) });
        }
      }} />
    </Box>
  );
}

