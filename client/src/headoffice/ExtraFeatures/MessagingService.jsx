import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Cart from '@material-ui/icons/AddShoppingCart';
import TextField from 'material-ui/TextField';
import AddIcon from '@material-ui/icons/Add';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';


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
  button: {
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 400,
  },
  tablehead : {
    align:'center',
  },
  setHeight:{
    height:'90vh',
    marginTop:'-50px'
  },
  paperHeight:{
    height:400,
    overflowY:'scroll'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  button: {
    maxWidth:'2px',

  }
});


class Sale extends React.Component {
  componentDidMount(){
    var details = {
     'token':this.state.t
 };
 
 
 var formBody = [];
 for (var property in details) {
   var encodedKey = encodeURIComponent(property);
   var encodedValue = encodeURIComponent(details[property]);
   formBody.push(encodedKey + "=" + encodedValue);
 }
 formBody = formBody.join("&");
 
 
 fetch('/head/fetchcustdetails', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
   },
   body: formBody
 })
 .then(res=>res.json())
 .then(res=>{

   if(res){
    this.setState({
      data:res
    });
   };
   console.log(res);
 }
 );   
}

  deleteClick = (index) => {
          var temp = this.state.cartItems;
          temp.push(this.state.data[index]);
          var tempData = this.state.data;
          
          if (index > -1) {
            tempData.splice(index, 1);
          }
          this.setState({
            cartItems : temp,
            data:tempData
          });
          this.reCalculateBill();
  }


//CheckOut and call API
  checkOut= () =>{

  console.log(this.state.checked);    
  
  }
  
  changeItemName = e => {
    this.setState({
      itemName:e.target.value,
    })
  }

  changeMessage = e => {
    this.setState({
      message:e.target.value,
    })
  }

  findItem = () => {
    let temp = []
    Object.values(this.state.data).map((type,index)=>{
      if (type.customerName.toLocaleLowerCase().indexOf(this.state.itemName.toLocaleLowerCase())>=0){
       temp.push(type);
      }
    })
    this.setState({
      data:temp
    })
  }
  cancelSearch = () => {
    var details = {
      'token':this.state.t
  };
  
 
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  
  fetch('/head/fetchcustdetails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
    },
    body: formBody
  })
  .then(res=>res.json())
  .then(res=>{
 
    if(res){
     this.setState({
       data:res
     })
    };
  }
  );   
  }

  constructor(props){
    super(props);
    
    this.state = {
      shop:this.props.shop,
      t:this.props.token,
      data:{},
      message:'',
      checked:[]
    }

   this.deleteClick =  this.deleteClick.bind(this);
  }


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
      list:this.state.checked
    });
  };


  render() {
    const { classes } = this.props;
        return (
          <div className={classes.setHeight}>

            <Grid container className={classes.root} spacing={12}>  
              <Grid item xs={6}>
              <h1 className="text-center">
                  SMS service
              </h1>
              <Paper className={classes.paper || classes.paperHeight} >
              <TextField
                    id="itemname"
                    label="Find Customer"
                    value={this.state.itemName}
                    placeholder="Find Item"
                    onChange={e => this.changeItemName(e)}
                    className={classes.textField}
                    margin="normal"
                />
                <Button  color="primary" onClick={this.findItem}  className={classes.button}>Find</Button>
                <Button  color="primary" onClick={this.cancelSearch}  className={classes.button}>All Items</Button>
                <List>
            
            {Object.values(this.state.data).map(type => {
              
            
                return (<ListItem
                  key={type.customerPhone}
                  role={undefined}
                  dense
                  button
                  onClick={this.handleToggle(type.customerPhone)}
                  className={classes.listItem}
                  >
                    <Checkbox
                      checked={this.state.checked.indexOf(type.customerPhone) !== -1}
                      tabIndex={-1}
                      disableRipple
                      color="primary"
                    />
                    <ListItemText primary={type.customerName} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Comments">
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>)
              }
              )
            }
            </List>
                              </Paper>
              </Grid>
              <Grid item xs={6}>
                    <h1 className="text-center">
                      Message
                    </h1>
                    <TextField
                        id="message"
                        fullWidth={true}
                        rows={18}
                        multiline
                        label="Enter Message"
                        value={this.state.message}
                        placeholder="Type the message you want to send"
                        onChange={e => this.changeMessage(e)}
                        className={classes.textField}
                        margin="normal"
                    />
                
              </Grid>
            </Grid>
           
            <div className="text-center pt-5">
                <Button  variant="raised" aria-label="Add" onClick={()=>{this.checkOut()}} >
                    SEND
                </Button>
              </div>
          </div>
        );
      }
  }
  

Sale.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sale);
