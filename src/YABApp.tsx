import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container, Grid, AppBar, Toolbar, Typography, Paper,
} from '@material-ui/core';
import Search from './Search';
import './YABApp.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'aliceblue',
    minHeight: '100vh',
  },
  title: {
    flexGrow: 1,
  },
  content: {
    textAlign: 'center',
  },
  container: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  gridItem: {
    backgroundColor: '#819595',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  fixedHeight: {
    height: 240,
  },
}));

const YABApp = () => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            News
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.gridItem}>
              <Paper id="search-box-wrapper" className={classes.paper}>
                <Search />
              </Paper>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <Paper className={fixedHeightPaper}>
                <span>Business Listing</span>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default YABApp;