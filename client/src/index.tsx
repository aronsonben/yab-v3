import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import YABApp from './YABApp';

const theme = createTheme();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <YABApp />
  </ThemeProvider>,
  document.getElementById('root'),
);
