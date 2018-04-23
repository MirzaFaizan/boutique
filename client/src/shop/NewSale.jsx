import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import NumericInput from 'react-numeric-input';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AddIcon from '@material-ui/icons/Add';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText,ListItemSecondaryAction } from 'material-ui/List';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    
  },
  menu: {
    width: 200,
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


class TextFields extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <Grid container spacing={24}>

        <Grid item xs={12} sm={5}>
          <Paper className={classes.paper}>
          
      <form className={classes.container} noValidate autoComplete="off"> 
       <TextField
          id="name"
          label="Search Item "
          placeholder="Enter Item Name "
          className={classes.textField}
          margin="normal"
          fullWidth
        />   
      </form>
      
      <List component="nav">
        <ListItem>
          <ListItemText primary="Item Name " />

          <ListItemSecondaryAction>
                      <Button>Button</Button>
                      <IconButton aria-label="Add" >
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
        </ListItem>
        <ListItem button component="a" >
          <ListItemText primary="Item Name " />

          <ListItemSecondaryAction>
                      <IconButton aria-label="Add">
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
        </ListItem>
      </List>


      </Paper>
        </Grid>
      
        <Grid item xs={12} sm={7}>
       
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
        </Grid>
      </Grid>
      
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
