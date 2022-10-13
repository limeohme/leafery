// import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App-styles.js';
import Navbar from './quasidumb-components/Navbar/Navbar';
import Login from './views/Login/Login';
import { Box, useTheme } from '@mui/material';
import { darkTheme, lightTheme } from './common/theme-colours';
import Register from './views/Register/Register';
import { getLoggedUser } from './services/users-service';
import { useState } from 'react';
import AppState from './providers/app-state';
import Landing from './views/Landing/Landing';
import Authenticated from './HOC/Authenticated';
import Dashboard from './views/Dashboard/Dashboard';
import Whiteboard from './views/Whiteboard/Whiteboard';
import Profile from './views/Profile/Profile';
import { appStyle } from './App-styles.js';
import CreateLeaf from './views/CreateLeaf/CreateLeaf';
// import AppState from './providers/app-state';

const userHandle = JSON.parse(getLoggedUser()); 
// const snap = await getUserByHandle(userHandle);
// const user = snap.val();

function App() {
  const theme = useTheme();
  theme.palette.primary = {
    ...theme.palette.primary,
    main: lightTheme.accent,
    dark: lightTheme.txcolour
  };

  const [context, setContext] = useState({    
    user: userHandle,
    theme: 'light',
  });

  
  return (
    <Box sx={{ ...appStyle,
      bgcolor: context.theme === 'dark' ? darkTheme.bgcolour : lightTheme.bgcolour,
      color: context.theme === 'dark' ? darkTheme.txcolour : lightTheme.txcolour
    }}>
      <BrowserRouter>
        <AppState.Provider value={{ context, setContext }}>
          <Navbar/> 
          <Routes>
            <Route index element={<Landing/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/*' element={
              <Authenticated>
                <Routes>
                  <Route path='dashboard' element={<Dashboard/>}/>
                  <Route path='detailed-leaf/:leafID' element={<CreateLeaf/>}/>
                  <Route path='create-leaf' element={<CreateLeaf/>}/>
                  <Route path='whiteboard' element={<Whiteboard/>}/>
                  <Route path='profile' element={<Profile/>}/>
                </Routes>
              </Authenticated>
            }></Route>
          </Routes>
        </AppState.Provider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
