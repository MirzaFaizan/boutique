import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Cart from '@material-ui/icons/AddShoppingCart';
import TextField from 'material-ui/TextField';
import CustomerCheck from './ExtraFeatures/AddOrSearchCustomers';
import Printer from './ExtraFeatures/Printer';


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
     'token':this.state.t,
     'shopID':this.state.shop
 };
 
 
 var formBody = [];
 for (var property in details) {
   var encodedKey = encodeURIComponent(property);
   var encodedValue = encodeURIComponent(details[property]);
   formBody.push(encodedKey + "=" + encodedValue);
 }
 formBody = formBody.join("&");
 
 
 fetch('/shop/shopinventory', {
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

    if(localStorage.getItem('customerExists')==='1'){
      
    var itemIdArray=[];
    this.state.cartItems.map((item)=>{
      itemIdArray.push(item.item_id);
    });
    var date = new Date();
    date.setHours(date.getHours()+5);
    var details = {
      'token':this.state.t,
      'sale':new Date(),
      'products':itemIdArray,
      'shopID':this.props.shop,
      'total':this.state.bill
    };
  
 
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  
      fetch('/shop/Sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
        },
        body: formBody
      })
      .then(res=>res.json())
      .then(()=>{
      //  Printer.printData(this.state.cartItems,this.state.bill,this.state.discount,this.state.return);
      })
      .then(res=>{
        // reseting Bill portion
        this.setState({
          cartItems:[],
          bill:0,
          discount:0,
          originalBill:0
        });
      });
      localStorage.setItem('customerExists','0');
      
    } else {
        console.log("Submit a valid Customer");
    }


  }
  
  
  //recalculation of Bill
  reCalculateBill = () =>{
    var billTemp = 0;
    this.state.cartItems.map((item)=>{
      billTemp += parseInt(item.price)
    });
    this.setState({
      bill:billTemp,
      originalBill:billTemp,
    });

  }


  ResetBill=()=>{
    this.setState({
      bill:0,
      cartItems:[],
      originalBill:0,
      itemName:''
    });



    var details = {
      'token':this.state.t,
      'shopID':this.state.shop
  };
  
  
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  
  fetch('/shop/shopinventory', {
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


  deleteClickHandler = () => {
    this.setState({
      isDisabled:false,
      buttonisDisabled:false,
    });
  }
  changeDiscount = e => {
    this.setState({
      discount:e.target.value,
    })
  }
  changeCash = e => {
    
    var tempReturnCash = e.target.value-this.state.bill;
    
    this.setState({
      cash:e.target.value,
      return: tempReturnCash
    });

  }
  setDiscount = () => {
    let temp = parseInt(this.state.discount,10);
    temp=((temp/100)*this.state.bill)
    this.setState({
      bill:this.state.bill-temp
    });
  }
  changeItemName = e => {
    this.setState({
      itemName:e.target.value,
    })
  }

  findItem = () => {
    let temp = []
    Object.values(this.state.data).map((type,index)=>{
      if (type.item_name.toLocaleLowerCase().indexOf(this.state.itemName.toLocaleLowerCase())>=0){
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
  
  
  fetch('/shop/shopinventory', {
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
      date:'2018-09-04 00:00:00.000',
      data:{},
      id:'',
      cartItems:[],
      bill:0,
      originalBill:0,
      discount:0,
      itemName:'',
      cash:0,
      return:0
    }

   this.deleteClick =  this.deleteClick.bind(this);
  }



  render() {
    const { classes } = this.props;
        return (
          <div className={classes.setHeight}>

            <Grid container className={classes.root} spacing={12}>  
              <Grid item xs={6}>
              <h1 className="text-center">
                  Available Items
              </h1>
              <Paper className={classes.paper || classes.paperHeight} >
              <TextField
                    id="itemname"
                    label="Find Item"
                    value={this.state.itemName}
                    placeholder="Find Item"
                    onChange={e => this.changeItemName(e)}
                    className={classes.textField}
                    margin="normal"
                />
                <Button  color="primary" onClick={this.findItem}  className={classes.button}>Find</Button>
                <Button  color="primary" onClick={this.cancelSearch}  className={classes.button}>All Items</Button>
                  <Table className={classes.table}>
                    <TableHead className={classes.tablehead}>
                      <TableRow>
                        <CustomTableCell>Name</CustomTableCell>
                        <CustomTableCell numeric >Price</CustomTableCell>
                        <CustomTableCell numeric>Sale</CustomTableCell> 
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.values(this.state.data).map((type,index) => {
                            return (
                              <TableRow className={classes.row} key={type._id} selectable={true}>
                                <CustomTableCell >{type.item_name}</CustomTableCell>
                                <CustomTableCell numeric >{type.price}</CustomTableCell>
                                <CustomTableCell >
                                <Button  aria-label="Add" onClick={()=>{this.deleteClick(index)}} >
                                <Cart/>
                                </Button>
                                </CustomTableCell>
                              </TableRow>
                        );
                      })
                      }
                    </TableBody>
                  </Table>
                  </Paper>
              </Grid>
              <Grid item xs={6}>
                    <h1 className="text-center">
                      Bill
                    </h1>
                <Paper className={classes.paper || classes.paperHeight}>
                  <Table className={classes.table}>
                    <TableBody>
                        {Object.values(this.state.cartItems).map((type,index) => {
                              return (
                                <TableRow className={classes.row} key={type._id} selectable={true}>
                                  <CustomTableCell>{type.item_name}</CustomTableCell>
                                  <CustomTableCell >{type.price}</CustomTableCell>
                                </TableRow>
                          );
                        })
                        }
                      </TableBody>
                    </Table>
                </Paper>
                
              </Grid>
            </Grid>
           
            <Grid container spacing={12}>
              <Grid item xs={6}>
                <Grid container spacing={12}>
                  <Grid item xs={6}>
                    <TextField
                      id="discount"
                      label="discount"
                      value={this.state.discount}
                      placeholder="Enter Discount Percentage"
                      onChange={e => this.changeDiscount(e)}
                      margin="normal"
                    />
                  <Button variant='raised' aria-label="Done" onClick={this.setDiscount}>OK</Button>
                  <CustomerCheck token = {this.state.t}/>
                
                  </Grid>
                  <Grid item xs={6}>
                  <TextField
                      id="Cash"
                      label="Cash"
                      value={this.state.cash}
                      placeholder="Enter Cash"
                      onChange={e => this.changeCash(e)}
                      margin="normal"
                    />
                    <h3> Return : {this.state.return}</h3> 
                  </Grid>
                </Grid>
              </Grid>
             
              <Grid item xs={6}>
                <Grid container spacing={12}>
                  <Grid item xs={9}>
                    <h1 className="text-left">Original Bill = <strong> {this.state.originalBill}</strong></h1>
                    <h1 className="text-left"> Discounted Bill = <strong>{this.state.bill}</strong></h1>
                  </Grid>
                  <Grid item xs={3}>
                  <Button   variant="raised" aria-label="Add" onClick={()=>{this.ResetBill()}} >
                      Reset Bill
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
            <div className="text-center">
                <Button  variant="raised" aria-label="Add" onClick={()=>{this.checkOut()}} >
                    CheckOut
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
