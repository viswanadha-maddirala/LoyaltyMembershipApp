// src/App.jsx
import { useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import LoyaltyForm from './components/LoyaltyForm';
import { ThemeContext } from './context/ThemeContext';
import './App.css';

export default function App() {
  const { darkMode } = useContext(ThemeContext); // Get theme state

  // Create MUI theme based on darkMode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="form-container">
        <LoyaltyForm />
      </div>
    </MuiThemeProvider>
  );
}