import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import {
  Typography, Table, TableContainer, TableBody, TableCell, TableHead,
  TableRow, Paper, TableFooter, IconButton, TablePagination, Container,
} from '@mui/material';
import {
  FirstPage, LastPage, KeyboardArrowLeft, KeyboardArrowRight,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import BusinessCard from './BusinessCard';
import './YABApp.css';

interface Props {
  businessList: any[],
}

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  backgroundColor: 'beige',
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}

const TablePaginationActions = (
  props: TablePaginationActionsProps,
) => {
  const classes = useStyles1();
  const theme = useTheme();
  const {
    count, page, rowsPerPage, onPageChange,
  } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div id="paginationComponent" className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="prev page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // border: '1px solid black',
    padding: theme.spacing(1),
    justifyContent: 'space-evenly',
  },
  gridItem: {
    flexGrow: 1,
    margin: theme.spacing(0, 1),
    padding: 0,
  },
  subtitle: {
    fontStyle: 'italic',
  },
  tableRoot: {
    background: 'white',
  },
  centeredCell: {
    textAlign: 'center',
    borderBottomColor: 'black',
  },
}));

const Listing: React.FC<Props> = ({ businessList }: Props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, businessList.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <Container>
      <StyledPaper>
        <Typography component="h1" variant="h6" noWrap sx={{ flexGrow: '1' }}>
          Business Listing
        </Typography>
        <Typography component="p" variant="subtitle1" noWrap sx={{ flexGrow: '1' }} className={classes.subtitle}>
          { 'Showing ' }
          {rowsPerPage}
          { ' of ' }
          {businessList.length}
          { ' businesses' }
        </Typography>
      </StyledPaper>
      <TableContainer>
        <Table className={classes.tableRoot} aria-label="business table">
          <TableBody>
            {(rowsPerPage > 0
              ? businessList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : businessList
            ).map((biz) => (
              <TableRow key={biz.alias}>
                <BusinessCard business={biz} />
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={1}
                count={businessList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Listing;
