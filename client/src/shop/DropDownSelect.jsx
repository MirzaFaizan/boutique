import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
  button:{
    height:35,
    marginTop:10,
    marginLeft:15, 
  },textField1 :{
    marginTop:9,
    marginLeft:5,
  }
});

const ranges = [
  {
    value: 'Name',
    label: 'Name',
  },
  {
    value: 'ID # ',
    label: 'ID # ',
  },
];

class InputAdornments extends React.Component {
  state = {
    searchBy : 'Name',
    value : 'name'
  };

  handleChange = prop => event => {
    this.setState({ searchBy: event.target.value });
    
  };


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
       
        <TextField
          select
          label="Search Item"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.searchBy}
          onChange={this.handleChange('searchBy')}
          InputProps={{
            startAdornment: <InputAdornment position="start">By </InputAdornment>,
          }}
          >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
       
        <TextField
        
          id="name"
          label={this.state.searchBy}
          className={classes.textField1}
          
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <Button color="primary" variant="raised" className={classes.button}>
        Search
      </Button>
        
      </div>
    );
  }
}
InputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputAdornments);