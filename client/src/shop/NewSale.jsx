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

var data = [
  {sr: '1',itemname: 'Apple Iphone X ',price: 140000,qty:1,lineTotal: 140000}
];



class TextFields extends React.Component {
  state = {
    name:'',
    sr: [1,2,3,4,5],
    
    
    
  };
  

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };



 addRow = () =>
 {
   console.log("kjsdjkdsf");
   this.setState({ sr: [...this.state.sr, 56] });
    
 }
  
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
                      <Button onClick={this.addRow.bind(this)}>Button</Button>
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
        
          {this.state.sr.map(n => {
            return (
              <TableRow>
              <TableCell >{n}</TableCell>
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
