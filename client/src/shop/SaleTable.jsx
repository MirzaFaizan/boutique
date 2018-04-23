import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import NumericInput from 'react-numeric-input';


const styles = theme => ({
  root: {
    width: '100%',
   
    overflowX: 'auto',
  },
  table: {
    width: '100%',
  },
});

let sr = 0;
function createData(sr, itemname, price, qty, lineTotal) {
 
  return {sr, itemname, price, qty, lineTotal};
}

const data = [
  createData('1', 'Apple Iphone X ', 140000,1, 140000),

];
class SaleTable extends React.Component
{
  state = {
    lineTotal : '',
  }
};

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>SR # </TableCell>
            <TableCell >Item Name </TableCell>
            <TableCell numeric>Price</TableCell>
            <TableCell numeric>Qty</TableCell>
            <TableCell numeric>Total</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
           <TableRow>
              <TableCell >{n.sr}</TableCell>
                <TableCell>{n.itemname}</TableCell>
                <TableCell numeric>{n.price}</TableCell>
                <TableCell > <NumericInput mobile  size="3" value={n.qty} min={0} max={50}  /></TableCell>
                
                <TableCell numeric>{n.lineTotal}</TableCell>
                
                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
     
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);