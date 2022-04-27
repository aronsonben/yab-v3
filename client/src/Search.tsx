import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Grid, InputLabel, MenuItem, TextField, Button,
} from '@mui/material';
import './YABApp.css';

export type TCategory = Readonly<{
  id: number,
  alias: string,
  title: string,
  parents: string,
  whitelist: string,
  blacklist: string
}>;

interface Props {
  categories: TCategory[],
  handleSearch: (category: string, address: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // border: '1px solid #d3d3d3',
    // padding: theme.spacing(1),
    justifyContent: 'space-evenly',
  },
  gridItem: {
    flexGrow: 1,
    margin: theme.spacing(0, 1),
    padding: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Search: React.FC<Props> = ({ categories, handleSearch }: Props) => {
  const classes = useStyles();
  const [category, setCategory] = React.useState('');

  const handleChange = (event: any) => {
    setCategory(event.target.value);
  };

  return (
    <Grid container spacing={2} component="form" className={classes.root} id="search-box">
      <Grid item xs={12} sm={6} className={classes.gridItem}>
        <TextField
          id="category-select"
          label="Category"
          select
          value={category}
          onChange={handleChange}
          helperText="Select category"
          fullWidth
          margin="normal"
          variant="outlined"
        >
          {categories.map((option) => (
            <MenuItem key={option.alias} value={option.alias}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.gridItem}>
        <TextField
          id="address-search-box"
          label="Address"
          type="search"
          placeholder="123 Main St SE, Washington, DC 20003"
          helperText="e.g. 123 Main St SE, Washington, DC 20003"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} className={classes.gridItem}>
        <Button variant="contained" color="primary" onClick={() => handleSearch(category, '1356 Independence Ave SE, Washington, DC 20003')}>Submit</Button>
      </Grid>
    </Grid>
  );
};

export default Search;
