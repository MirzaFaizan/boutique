import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from 'material-ui/Icon';


const styles = theme => ({
  button: {
    margin:theme.spacing.unit,
    display:'flex',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '20%',
  },
  menu: {
    width: 200,
  },
});


class TextFields extends React.Component {
  state = {
    name: '',
    type: '',
    price: '',
    id: '',
  };


  handleChange = name => event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state)
  };

  //change function
  changeName = e => {
    this.setState({
      name: e.target.value
    });
  };

  changeType = e => {
    this.setState({
      type: e.target.value
    });
  }

  changePrice = e => {
    this.setState({
      price: e.target.value
    });
  }

  changeID = e => {
    this.setState({
      id: e.target.value,
    });
  }

  list = {}

  handleClick = () => {
    console.log(this.state);
    
    console.log(this.listitems)
    this.setState({
      name:'',
      type:'',
      price:'',
      id:'',
    })

    //posting data to api call here
  }
  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off"> 
       <TextField
          id="name"
          label="Name"
          value={this.state.name}
          placeholder="Enter Name of Product"
          className={classes.textField}
          onChange={e => this.changeName(e)}
          margin="normal"
          refs='name'
          
        />
        <TextField
          id="type"
          label="Type"
          value={this.state.type}
          placeholder="Enter Type of Product"
          onChange={e => this.changeType(e)}
          className={classes.textField}
          margin="normal"
        />
          
        <TextField
          id="price"
          label="Price"
          value={this.state.price}
          placeholder="Enter Price of Product"
          onChange={e => this.changePrice(e)}
          className={classes.textField}
          margin="normal"
        />

          <TextField
          id="id"
          label="ID"
          value={this.state.id}
          placeholder="Enter ID of Product"
          onChange={e => this.changeID(e)}
          className={classes.textField}
          margin="normal"/>

        <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick} >
        <AddIcon/>
        </Button>
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
