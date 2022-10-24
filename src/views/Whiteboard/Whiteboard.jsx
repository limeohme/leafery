import { useState, useRef, useEffect, useContext } from 'react';
import { Excalidraw } from '@excalidraw/excalidraw';
// import InitialData from './initialData';

import './styles.scss';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { lightTheme } from '../../common/theme-colours';
import Foldable from '../../HOC/Foldable';
import AppState from '../../providers/app-state';

export default function App() {
  const excalidrawRef = useRef(null);
  const [WB, setWB] = useState();
  const { context: { user } } = useContext(AppState);

  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [openModes, setOpenModes] = useState(false);

  useEffect(() => {
    (async() => {
      try {
        const data = JSON.parse(localStorage.getItem('wb')) || null;
        console.log(data);
        if (data) delete data.appState.collaborators;
        data? setWB(data) : setWB(null);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);

  const updateBoardHandler = async (wb) => {
    localStorage.setItem('wb', JSON.stringify(wb));
  };
  // const updateBoardHandler = async (wb) => {
  //   return setTimeout(() => {
  //     setWhiteboard(user, wb).catch(console.error);
  //   }, 60000);
  // };
  // if (excalidrawRef.current) excalidrawRef.current.updateScene(WB);
  return (
    <Box className="whiteboard" sx={{ display: 'flex', flexDirection: 'column' , alignItems: 'center', width: '80vw', minWidth: '300px' }}>
      <Box className="button-wrapper">
        <Box sx={{ maxWidth: '80vw' }}>
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
      </Box>
      <div className="excalidraw-wrapper">
        <Excalidraw
          ref={excalidrawRef}
          initialData={WB}
          onChange={(elements, state) =>
            updateBoardHandler({ elements: elements, appState: state })
          }
          // onPointerUpdate={(payload) => console.log(payload)}
          onCollabButtonClick={() =>
            window.alert('You clicked on collab button')
          }
          viewModeEnabled={viewModeEnabled}
          zenModeEnabled={zenModeEnabled}
          gridModeEnabled={gridModeEnabled}
        />
      </div>
    </Box>
  );
}