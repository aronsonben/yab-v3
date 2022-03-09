import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
import YABApp from './YABApp';

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <YABApp />
  </React.StrictMode>,
  document.getElementById('root'),
);
