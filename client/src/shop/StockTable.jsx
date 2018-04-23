import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Select from './DropDownSelect';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, sr, qty, price) {
  id += 1;
  return { id, name, sr, qty, price};
}

const data = [
  createData('Item name . . . . ', 184937, 56, 2450),
  createData('Item name . . . . ', 184937, 56, 2450),
  createData('Item name . . . . ', 184937, 56, 2450),
  createData('Item name . . . . ', 184937, 56, 2450),
  createData('Item name . . . . ', 184937, 56, 2450),
 
 
];

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
    <Select/>
      <Table className={classes.table}>
        <TableHead>
        <TableRow>
            <CustomTableCell>Item Name</CustomTableCell>
            <CustomTableCell numeric>ID #</CustomTableCell>
            <CustomTableCell numeric>QTY</CustomTableCell>
            <CustomTableCell numeric>Price (Rs)</CustomTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow className={classes.row} key={n.id}>
                <CustomTableCell>{n.name}</CustomTableCell>
                <CustomTableCell numeric>{n.sr}</CustomTableCell>
                <CustomTableCell numeric>{n.qty}</CustomTableCell>
                <CustomTableCell numeric>{n.price}</CustomTableCell>
                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
