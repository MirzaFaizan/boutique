import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Table from './SaleTable';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Items from './ItemsList';



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
});


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
      <Items/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7}>

          
          <Table/>
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
