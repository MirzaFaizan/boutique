import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import { Button } from 'material-ui';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3F51B5',
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


class CustomizedTable extends React.Component {

  handleClick = () =>{
    var details = {
      'token':this.state.t,
      'cN':this.state.name,
      'cP':this.state.phone,
  };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch('/shop/customerdetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
      },
      body: formBody
    })
    .then(res=>res.json())
    .then(res=>{
      console.log("we are in this function");
      console.log(this.state.t);
      if(res){
       console.log(res);
       this.setState({
         data:res
       })
        console.log("After function");
        console.log(this.state.t);
      };
    }
    );

  };

  constructor(props){
    super(props)
    this.state={
      t:this.props.token,
      name:'',
      phone:''
    }
};

changeName = e => {
    this.setState({
      name: e.target.value
    })
  }

  changePhone = e => {
    this.setState({
      phone: e.target.value
    })
  }

  render() {
    const { classes } = this.props;
    return (
         <div>
               <TextField
          id="name"
          label="Name"
          value={this.state.name}
          placeholder="Enter Customer Name"
          className={classes.textField}
          onChange={e => this.changeName(e)}
          margin="normal"
          refs='name'
        />
      
      <TextField
          id="phone"
          label="Phone"
          value={this.state.phone}
          placeholder="Enter Phone Number"
          className={classes.textField}
          onChange={e => this.changePhone(e)}
          margin="normal"
          refs='name'
        />
        <Button onClick={this.handleClick}>Add</Button>
       
          </div>
    );
  }
}


CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
