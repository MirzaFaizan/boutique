import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from 'material-ui/Icon';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import CommentIcon from '@material-ui/icons/Comment';


const styles = theme => ({
    root: {
        width: '',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
      },
      listSection: {
        backgroundColor: 'inherit',
      },
      ul: {
        backgroundColor: 'inherit',
        padding: 0,
      },
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
    checked: [0],
    list:{}
  };
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];//[...checked]<--this means keeping all previous states as well

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
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

  changeShop = e => {
    this.setState({
      type: e.target.value
    });
  }


  changeID = e => {
    this.setState({
      id: e.target.value,
    });
  }

  handleClick = () => {
    console.log(this.state);
    this.setState({
      name:'',
      shop:'',
      id:'',
      //list object = json pacakage from api
    })
  }

  //api call 
  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off"> 
       <TextField
          id="name"
          label="Name"
          value={this.state.name}
          placeholder="Enter Name of Batch (Just say Batch)"
          className={classes.textField}
          onChange={e => this.changeName(e)}
          margin="normal"
          refs='name'
          
        />
        <TextField
          id="shop"
          label="Shop"
          value={this.state.shop}
          placeholder="Enter Shop Name"
          onChange={e => this.changeShop(e)}
          className={classes.textField}
          margin="normal"
        />

          <TextField
          id="id"
          label="ID"
          value={this.state.id}
          placeholder="Enter ID of Batch"
          onChange={e => this.changeID(e)}
          className={classes.textField}
          margin="normal"/>
          
    <div className={classes.root}>
        <List>
          {/*0,1,2,3 to be replaced with json pacakage
          key = value, value can be replaced with id of items*/}
          {[0, 1, 2, 3].map(value => (
            <ListItem
              key={value}
              role={undefined}
              dense
              button
              onClick={this.handleToggle(value)}
              className={classes.listItem}
            >
              <Checkbox
                checked={this.state.checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
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
