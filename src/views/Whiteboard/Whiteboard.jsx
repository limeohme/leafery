import { useState, useRef } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
// import InitialData from './initialData';

import './styles.scss';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { lightTheme } from '../../common/theme-colours';
import Foldable from '../../HOC/Foldable';

export default function App() {
  const excalidrawRef = useRef(null);

  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [openModes, setOpenModes] = useState(false);

  return (
    <div className="whiteboard">
      <div className="button-wrapper">
        <Box>
          <Button
            className="reset-scene"
            onClick={() => {
              excalidrawRef.current.resetScene();
            }}
          >
          Reset Scene
          </Button>
          <Button
            className="reset-scene"
            onClick={() => {
              setOpenModes(!openModes);
            }}
          >
          View Modes
          </Button>
        </Box>
        <Box sx={{ display: 'flex' , flexDirection: 'row' }}>
          <Foldable open={openModes}>
            <FormControlLabel 
              control={<Checkbox aria-label='checkbox edit' sx={{ color: lightTheme.accent }} checked={viewModeEnabled}
                onChange={() => setViewModeEnabled(!viewModeEnabled)}/>}
              label="View?" />
            <FormControlLabel 
              control={<Checkbox aria-label='checkbox edit' sx={{ color: lightTheme.accent }} checked={zenModeEnabled}
                onChange={() => setZenModeEnabled(!zenModeEnabled)}/>}
              label="Zen?" />
            <FormControlLabel 
              control={<Checkbox aria-label='checkbox edit' sx={{ color: lightTheme.accent }} checked={gridModeEnabled}
                onChange={() => setGridModeEnabled(!gridModeEnabled)}/>}
              label="Grid?" />
          </Foldable>
        </Box>
      </div>
      <div className="excalidraw-wrapper">
        <Excalidraw
          ref={excalidrawRef}
          onChange={(elements, state) =>
            console.log('Elements :', elements, 'State : ', state)
          }
          onPointerUpdate={(payload) => console.log(payload)}
          onCollabButtonClick={() =>
            window.alert('You clicked on collab button')
          }
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
        />
      </div>
    </div>
  );
}