import { useState, useRef } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
// import InitialData from './initialData';

import './styles.scss';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { lightTheme } from '../../common/theme-colours';
import Foldable from '../../HOC/Foldable';

export default function App() {
  const excalidrawRef = useRef(null);

  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [openModes, setOpenModes] = useState(false);

  const updateScene = () => {
    const sceneData = {
      elements: [
        {
          type: 'rectangle',
          version: 141,
          versionNonce: 361174001,
          isDeleted: false,
          id: 'oDVXy8D6rom3H1-LLH2-f',
          fillStyle: 'hachure',
          strokeWidth: 1,
          strokeStyle: 'solid',
          roughness: 1,
          opacity: 100,
          angle: 0,
          x: 100.50390625,
          y: 93.67578125,
          strokeColor: '#c92a2a',
          backgroundColor: 'transparent',
          width: 186.47265625,
          height: 141.9765625,
          seed: 1968410350,
          groupIds: [],
        },
      ],
      appState: {
        viewBackgroundColor: '#edf2ff',
      },
    };
    excalidrawRef.current.updateScene(sceneData);
  };

  return (
    <div className="whiteboard">
      <div className="button-wrapper">
        <Button className="update-scene" onClick={updateScene}>
          Update Scene
        </Button>
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