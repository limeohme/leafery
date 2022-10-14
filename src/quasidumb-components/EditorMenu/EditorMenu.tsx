import { Box, Button } from '@mui/material';
import { useContext, useState } from 'react';
import Foldable from '../../HOC/Foldable';
import './editor-menu-styles.scss';
import { 
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatAlignCenter,
  FormatBold,
  FormatItalic,
  FormatStrikethrough,
  HorizontalRule,
  InsertPageBreak,
  FormatQuote,
  Code,
  FormatListBulleted,
  FormatListNumbered,
  Notes,
  Undo,
  Redo,
  AddPhotoAlternate
} from '@mui/icons-material';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import AppState from '../../providers/app-state';


export default function EditorMenu ({ editor, addImage }: any) {
  const { context: { theme } } = useContext(AppState);
  const [triggers, setTriggers] = useState({
    style: false,
    alignment: false,
    structure: false
  });

  if (!editor) {
    return null;
  }

  
    
  return (
    <Box sx={{ boxSizing: 'border-box', m: 1, width: '50vw' }}>
      <Button onClick={() => setTriggers({ ...triggers, style: !triggers.style })}>styles</Button>
      <Foldable open={triggers.style}>
        <>
          <FormatBold sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
          />
          <FormatItalic sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
          />
          <FormatStrikethrough sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          />
          <FormatClearIcon sx={{ m: '5px' }} onClick={() => editor.chain().focus().unsetAllMarks().run()}/>
        </>

      </Foldable>
      <Button onClick={() => setTriggers({ ...triggers, structure: !triggers.structure })}>structure</Button>
      <Foldable open={triggers.structure}>
        <>
          <Notes sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={editor.isActive('paragraph') ? 'is-active' : ''}
          />
          <button data-format-btn style={{ color: theme === 'dark'? '#fff': '#000' }}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            h1
          </button>
          <button data-format-btn style={{ color: theme === 'dark'? '#fff': '#000' }}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            h2
          </button>
          <button data-format-btn style={{ color: theme === 'dark'? '#fff': '#000' }}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            h3
          </button>
          <button data-format-btn style={{ color: theme === 'dark'? '#fff': '#000' }}
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
          >
            h4
          </button>
          <button data-format-btn style={{ color: theme === 'dark'? '#fff': '#000' }}
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
          >
            h5
          </button>
          <button data-format-btn style={{ color: theme === 'dark'? '#fff': '#000' }}
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
          >
            h6
          </button>
          <FormatListBulleted sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          />
          <FormatListNumbered sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
          />
          <Code sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
          />
          <FormatQuote sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
          />
          <HorizontalRule sx={{ m: '5px' }} onClick={() => editor.chain().focus().setHorizontalRule().run()}/>

          <InsertPageBreak sx={{ m: '5px' }} onClick={() => editor.chain().focus().setHardBreak().run()}/>
          <FormatClearIcon sx={{ m: '5px' }} onClick={() => editor.chain().focus().clearNodes().run()}/>
        </>
      </Foldable>
      <Button onClick={() => setTriggers({ ...triggers, alignment: !triggers.alignment })}>align</Button>
      <Foldable open={triggers.alignment}>
        <>
          <FormatAlignLeft sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          />
          
          <FormatAlignCenter sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          />
          <FormatAlignRight sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          />
          <FormatAlignJustify sx={{ m: '5px' }}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
          />
          <FormatClearIcon sx={{ m: '5px' }} onClick={() => editor.chain().focus().unsetTextAlign().run()}/>
        </>
      </Foldable>
      <div>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <Undo/>
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <Redo/>
        </Button>

      </div>
      <AddPhotoAlternate sx={{ m: '5px', ml: '20px' }} onClick={addImage}/>
    </Box>
  );
};