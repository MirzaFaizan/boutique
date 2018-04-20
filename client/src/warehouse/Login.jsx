import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from 'material-ui/Icon';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Menu, { MenuItem } from 'material-ui/Menu';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

const styles = theme => ({
  button: {
    display:'flex',
  },
  container: {
    display: 'block',
    flexWrap: 'wrap',
    position:"relative",
  },
  textField: {
    width: '100%',
  },
  appBar: {
    display:'block',
    position:'relative'
  },
  typeobar: {
    marginTop:100
  },

  card: {
    marginLeft:650,
    marginRight:650,
    marginTop:100,
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  menu: {
    width: 200,
  },
});

const dropdowntypes = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'Head',
    label: 'Head',
  },
  {
    value: 'Shop',
    label: 'Shop',
  },
];


class TextFields extends React.Component {
  constructor(props){
    super(props)

   this.state = {
      userName: '',
      Password: '',
      type:''
    };

  }


  handleChange = name => event => {
    
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state)
  };

  handleClick = () => {
    console.log(this.state)
    var details = {
     'name': this.state.userName,
     'password': this.state.Password
 };
 
 var formBody = [];
 for (var property in details) {
   var encodedKey = encodeURIComponent(property);
   var encodedValue = encodeURIComponent(details[property]);
   formBody.push(encodedKey + "=" + encodedValue);
 }
 formBody = formBody.join("&");
 
 fetch('/head', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
   },
   body: formBody
 })
 .then(res=>res.json())
 .then(res=>{
   console.log("we are in this function");
   if(res){
     console.log('Login Successful');
    {this.props.updateWarehouse(res.token)}
     console.log("After function");
   };
 }
 );
      this.setState({
      userName:'',
      Password:'',
    })

  }
  //change function
  changeUsername = e => {
    this.setState({
      userName: e.target.value
    });
  };

  changePassword = e => {
    this.setState({
      Password: e.target.value
    });
  }
  changeType = e => {
    this.setState({
      type: e.target.value
    });
  }

//Database

//Database
  render() {
    const { classes } = this.props;

    return (
      <div>
           <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="title" color="inherit" noWrap>
          Powered By NerdWare
        </Typography>
      </Toolbar>
    </AppBar>
    <Typography variant="display1" color="inherit" align="center" className={classes.typeobar}>
          Login to the System
        </Typography>
    <Card className={classes.card}>
     
    <form className={classes.container} noValidate autoComplete="off"> 
    <CardContent>
    <TextField
    id="User name"
    label="User Name"
    value={this.state.userName}
    placeholder="Enter User Name"
    className={classes.textField}
    onChange={e => this.changeUsername(e)}
    margin="normal"
  />
    </CardContent>
    <CardContent>
  <TextField
    id="Password"
    label="Password"
    value={this.state.Password}
    placeholder="Enter Password"
    onChange={e => this.changePassword(e)}
    className={classes.textField}
    type='password'
    margin="normal"
  />
</CardContent>
<CardContent>
<TextField
          id="type"
          select
          className={classes.textField}
          value={this.state.type}
          onChange={e=>this.changeType(e)}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Please select your type"
          margin="normal"
        >
          {dropdowntypes.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </TextField>
</CardContent>

<CardContent>
  <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick.bind(this)} >
  Login
  </Button>
  </CardContent>
</form>
</Card>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(TextFields);

