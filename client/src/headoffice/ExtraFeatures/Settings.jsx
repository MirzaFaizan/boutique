import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Card, {  CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

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
    width: '100%',
  },
  menu: {
    width: 200,
  },
  card: {
    marginLeft:100,
    marginRight:100,
    marginTop:10,
    //maxWidth: 350,
  },
});

const dropdowntypes = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'head',
    label: 'Head',
  },
  {
    value: 'shop',
    label: 'Shop',
  },
];


class TextFields extends React.Component {

  state = {
    currencyType:'',
taxSetting:'',
companyName:'',
setEmail:'',
setaddress:'',
companyNts:'',
t:this.props.token,
  }

  componentWillMount() {
    console.log(this.props.token);
    //api call to store data in database here
      console.log(this.state)
      var details = {
        'token':this.state.t,
        
   };
   
   var formBody = [];
   for (var property in details) {
     var encodedKey = encodeURIComponent(property);
     var encodedValue = encodeURIComponent(details[property]);
     formBody.push(encodedKey + "=" + encodedValue);
   }
   formBody = formBody.join("&");
   
   fetch('/head/fetchsettings', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
     },
     body: formBody
   })
   .then(res=>res.json())
   .then(res=>{
  
     console.log("API response function");
     if(res){
      console.log(res);
      this.setState({
        setEmail:res[0].Set_Email,
        setaddress:res[0].Set_address,
        companyNts:res[0].Set_compNTS,
        companyName:res[0].company_name,
        currencyType:res[0].currency_type,
        taxSetting:res[0].tax_setting,
    })
    console.log(this.state);
     }
     else {
         console.log(res);
     }
     ;
   }
   );
  }


  handleChange = name => event => {
    this.setState({
      name: event.target.value,
    });
    console.log(this.state)
  };

  //change function
  changecurrencySetting = e => {
    this.setState({
      currencyType: e.target.value
    });
  };

  //change name
  changetaxSetting = e => {
    this.setState({
      taxSetting: e.target.value
    });
  };


  changeCompanyName = e => {
    this.setState({
      companyName: e.target.value
    });
  }

  changeSetEmail = e => {
    this.setState({
      setEmail: e.target.value
    });
  }

  changeSetAddress = e => {
    this.setState({
      setaddress: e.target.value
    });
  }

  changeCompanyNts = e => {
    this.setState({
      companyNts: e.target.value
    });
  }
 
  handleClick = () => {
    console.log(this.props.token);
    //api call to store data in database here
      console.log(this.state)
      var details = {
        'ctype':this.state.currencyType,
        'ts':this.state.taxSetting,
        'cn':this.state.companyName,
        'se':this.state.setEmail,
        'sa':this.state.setaddress,
        'sc':this.state.companyNts,
        'token':this.state.t,
       
   };
   
   var formBody = [];
   for (var property in details) {
     var encodedKey = encodeURIComponent(property);
     var encodedValue = encodeURIComponent(details[property]);
     formBody.push(encodedKey + "=" + encodedValue);
   }
   formBody = formBody.join("&");
   
   fetch('/head/SetSettings', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
     },
     body: formBody
   })
   .then(res=>res.json())
   .then(res=>{
  
     console.log("API response function");
     if(res){
      console.log(res);
     
     }
     ;
   }
   );
    
  }

    
  
  render() {
    const { classes } = this.props;
   

    return (
      <div>
        <Typography variant="display2">Add a new Employee</Typography>
        <Card className={classes.card}>
      <form className={classes.container} noValidate autoComplete="off"> 
      <CardContent>
      <TextField
          id="Currency Type"
          label="Currency Type"
          value={this.state.currencyType}
          placeholder={this.state.currencyType}
          className={classes.textField}
          onChange={e => this.changecurrencySetting(e)}
          margin="normal"
          refs='name'
        />
        </CardContent>

      <CardContent>
      <TextField
          id="taxsetting"
          label="Tax Setting"
          value={this.state.taxSetting}
          placeholder="Enter Tax Setting"
          className={classes.textField}
          onChange={e => this.changetaxSetting(e)}
          margin="normal"
          refs='name'
        />
        </CardContent>

        <CardContent>
        <TextField
          id="CompanyName"
          label="Company Name"
          value={this.state.companyName}
          placeholder="Enter Company Name"
          onChange={e => this.changeCompanyName(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="setemail"
          label="Set Email"
          value={this.state.setEmail}
          placeholder="Enter Email"
          onChange={e => this.changeSetEmail(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="setaddress"
          label="Set Address"
          value={this.state.setaddress}
          placeholder="Enter set Address"
          onChange={e => this.changeSetAddress(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <TextField
          id="companyNts"
          label="Company Nts"
          value={this.state.companyNts}
          placeholder="Enter Company Nts"
          onChange={e => this.changeCompanyNts(e)}
          className={classes.textField}
          margin="normal"
        />
        </CardContent>
        <CardContent>
        <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick}>
        <AddIcon/>
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
