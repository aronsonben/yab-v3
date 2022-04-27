import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Grid, TableCell, Typography, Chip, Button, Paper,
} from '@mui/material';
import {
  Star, StarBorder, StarHalf,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import './YABApp.css';

interface Props {
  business: any,
}

interface Categories {
  alias: string,
  title: string,
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  backgroundColor: 'lavender',
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  gridItem: {
    flexGrow: 1,
    padding: 0,
  },
  cellTest: {
    border: 'black',
  },
  businessImage: {
    height: '80px',
    width: '80px',
    borderRadius: '50%',
  },
  categoryChip: {
    margin: theme.spacing(0.5),
    backgroundColor: '#C60B1B',
    color: 'white',
  },
  starRate: {
    color: 'gold',
  },
  directions: {
    margin: theme.spacing(1),
    backgroundColor: 'primary',
  },
}));

const BusinessCard: React.FC<Props> = ({ business }: Props) => {
  const classes = useStyles();

  const createRating = (rating: number) => {
    // TODO: improve this by creating a loop (?)
    // apparently it's better for performance to use if-else...
    switch (true) {
      case rating > 4.5:
        return (
          <div>
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
          </div>
        );
      case rating === 4.5:
        return (
          <div>
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <StarHalf className={classes.starRate} />
          </div>
        );
      case rating > 3.5:
        return (
          <div>
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <StarBorder />
          </div>
        );
      case rating === 3.5:
        return (
          <div>
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <StarHalf className={classes.starRate} />
            <StarBorder />
          </div>
        );
      case rating > 2.5:
        return (
          <div>
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <StarBorder />
            <StarBorder />
          </div>
        );
      case rating > 1.5:
        return (
          <div>
            <Star className={classes.starRate} />
            <Star className={classes.starRate} />
            <StarBorder />
            <StarBorder />
            <StarBorder />
          </div>
        );
      case rating > 0.5:
        return (
          <div>
            <Star className={classes.starRate} />
            <StarBorder />
            <StarBorder />
            <StarBorder />
            <StarBorder />
          </div>
        );
      default:
        return 'n/a';
    }
  };

  const getMiles = (rawDistance: number) => {
    const milesRaw = rawDistance * 0.000621371192;
    return milesRaw.toFixed(2);
  };

  return (
    <TableCell className={classes.cellTest} align="center">
      <StyledPaper>
        <Grid container spacing={0} className={classes.root}>
          <Grid item xs={12} className={classes.gridItem}>
            <img className={classes.businessImage} src={business.image_url} alt={business.alias} />
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant="h5">{business.name}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant="caption">
              {business.location.display_address[0]}
              {' '}
              {business.location.display_address[1]}
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant="caption">{business.display_phone}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            {createRating(business.rating)}
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            {business.categories.map(
              (categ: Categories) => <Chip label={categ.title} size="small" key={categ.alias} className={classes.categoryChip} />,
            )}
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Button variant="contained" size="small" color="primary" disableElevation className={classes.directions}>Directions</Button>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Typography variant="caption">
              {getMiles(business.distance)}
              {' mi away'}
            </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
    </TableCell>
  );
};

export default BusinessCard;
