import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, TableCell, Typography, Chip,
} from '@material-ui/core';
import {
  Star, StarBorder, StarHalf,
} from '@material-ui/icons';
import './YABApp.css';
import { yellow } from '@material-ui/core/colors';

interface Props {
  business: any,
}

interface Categories {
  alias: string,
  title: string,
}

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
    background: 'inherit',
    borderColor: 'black',
  },
  businessImage: {
    maxHeight: '100px',
    maxWidth: '100px',
  },
  categoryChip: {
    margin: theme.spacing(0.5),
  },
  starRate: {
    color: 'yellow',
  },
}));

const BusinessCard: React.FC<Props> = ({ business }: Props) => {
  const classes = useStyles();

  const createRating = (rating: number) => {
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
      <Grid container spacing={0} className={classes.root}>
        <Grid item xs={12} className={classes.gridItem}>
          <img className={classes.businessImage} src={business.image_url} alt={business.alias} />
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="h5">{business.name}</Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          {createRating(business.rating)}
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          {business.categories.map(
            (categ: Categories) => <Chip label={categ.title} className={classes.categoryChip} />,
          )}
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="caption">
            {business.location.display_address[0]}
            {' '}
            {business.location.display_address[1]}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="caption">
            {getMiles(business.distance)}
            {' mi'}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.gridItem}>
          <Typography variant="caption">{business.display_phone}</Typography>
        </Grid>
      </Grid>
    </TableCell>
  );
};

export default BusinessCard;
