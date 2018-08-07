import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { Button } from 'material-ui';


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
       });
       localStorage.setItem('customerExists','1');
      };
    }
    );

  };

  checkClick = () =>{
    var details = {
      'token':this.state.t,
      'customerPhone':this.state.phone,
  };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    
    fetch('/shop/searchcustomers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
      },
      body: formBody
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(this.state.t);
      if(res==='No customer with this phone number'){
        console.log('not verified');
        localStorage.setItem('customerExists','0');
        this.setState({
          guest:false
        });  
      }else{
          localStorage.setItem('customerExists','1');
        }
      
      }
    );
  }

  constructor(props){
    super(props)
    this.state={
      t:this.props.token,
      name:'',
      phone:'',
      guest:true
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


  renderCustomerComponent=()=>{
    if(this.state.guest){
      return (
        <div>
          <TextField
              id="phone"
              label="Phone"
              value={this.state.phone}
              placeholder="Enter Phone Number"
              onChange={e => this.changePhone(e)}
              margin="normal"
              refs='name'
            />  
        <Button onClick={this.checkClick}>Check</Button>          
        </div>
      );
    } else {
      return (
        <div>
         <h3 className='text-center'> Add new customer </h3>
            <TextField
              id="name"
              label="Name"
              value={this.state.name}
              placeholder="Enter Customer Name"
              onChange={e => this.changeName(e)}
              margin="normal"
              refs='name'
            />
          
          <TextField
              id="phone"
              label="Phone"
              value={this.state.phone}
              placeholder="Enter Phone Number"
              onChange={e => this.changePhone(e)}
              margin="normal"
              refs='name'
            />
          <Button onClick={this.handleClick}>Add</Button>          
         </div>
        );  
    }
  }


  render() {
    const { classes } = this.props;
    return (this.renderCustomerComponent());
  }
}


CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
