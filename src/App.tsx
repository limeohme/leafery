// import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './quasidumb-components/Navbar/Navbar';
import Login from './views/Login/Login';
import { useTheme } from '@mui/material';
import { lightTheme } from './common/theme-colours';
// import AppState from './providers/app-state';

function App() {
  const theme = useTheme();
  theme.palette.primary = {
    ...theme.palette.primary,
    main: lightTheme.accent,
    dark: lightTheme.txcolour
  };

  // const [appState, setState] = useState({
  //   user: getLoggedUser() || null,
  //   theme: 'light'
  // });

  
  return (
    <div className="App">
      <BrowserRouter>
        {/* <AppState.Provider value={{ appState, setState }}> */}
        <Navbar/> 
        <Routes>
          <Route index/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        {/* </AppState.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
