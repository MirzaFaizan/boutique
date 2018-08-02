import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CardContent } from 'material-ui/Card';
import DeleteIcon from '@material-ui/icons/Delete';


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

  componentWillMount(){
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
    
    fetch('/shop/fetchemps', {
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
      console.log(res)
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
      data:{},
      t:this.props.token,
      name:'',
      cnic:'',
      type:'',
      shopid: '',
      phone:'',
    }
}

changeName = e => {
    this.setState({
      name: e.target.value
    });
};

changeCnic = e => {
  this.setState({
    cnic: e.target.value
  });
};
changeType = e => {
  this.setState({
    type: e.target.value
  });
};
changeShopID = e => {
  this.setState({
    shopid: e.target.value
  });
};
changePhoneNo = e => {
    this.setState({
      phone: e.target.value
    });
  };

handleClick = () => {
  console.log('Add Click')
  var details = {
    'token':this.state.t,
    'name':this.state.name,
    'cnic':this.state.cnic,
    'type':this.state.type,
    'shopID':this.state.shopid,
    'phone':this.state.phone
};


var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");


fetch('/shop/addemp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
  },
  body: formBody
})
.then(res=>res.json())
.then(res=>{
  if(res){
    console.log(res);

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

fetch('/shop/fetchemps', {
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
    console.log("After function");
  };
}
); 
this.setState({
    name:'',
    cnic:'',
    type:'',
    shopid: '',
    phone:'',
});
}


  //DElETE Emp

  deleteClick = (index) => {
    console.log({index})
    console.log(this.state.data[index])
    var details = {
      'token':this.state.t,
      'cnic':this.state.data[index].emp_cnic,
  };
  
 
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  
  fetch('/shop/deleteemp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
    },
    body: formBody
  })
  .then(res=>res.json())
  .then(res=>{
        //console.log("we are in this function");
        if(res){
          console.log(res);
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
      
      
      fetch('/head/ShowEmps', {
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
          console.log("After function");
        };
      }
  ); 

  }



  render() {
    const { classes } = this.props;
    return (
      <div>
    <form className={classes.container} noValidate autoComplete="off"> 
        <TextField
        id="name"
        label="Name"
        value={this.state.name}
        placeholder="Enter Name"
        className={classes.textField}
        onChange={e => this.changeName(e)}
        margin="normal"
        />
    <TextField
    id="cnic"
    label="cnic"
    value={this.state.cnic}
    placeholder="Enter cnic"
    className={classes.textField}
    onChange={e => this.changeCnic(e)}
    margin="normal"
  />
  <TextField
    id="Type"
    label="Type"
    value={this.state.type}
    placeholder="Enter Type"
    onChange={e => this.changeType(e)}
    className={classes.textField}
    margin="normal"
  />
    <TextField
    id="shopid"
    label="Shop ID"
    value={this.state.shopid}
    placeholder="Enter Shop ID"
    onChange={e => this.changeShopID(e)}
    className={classes.textField}
    margin="normal"
  />
    <TextField
    id="phone"
    label="Phone No"
    value={this.state.phone}
    placeholder="Enter Phone no"
    onChange={e => this.changePhoneNo(e)}
    className={classes.textField}
    margin="normal"
  />
<CardContent>
  <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick.bind(this)} >
    Add
  </Button>
  </CardContent>
</form>
      <Typography variant="display2"> All Employees</Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell numeric>Name</CustomTableCell>
              <CustomTableCell numeric>CNIC</CustomTableCell>
              <CustomTableCell numeric>Type</CustomTableCell>
              <CustomTableCell numeric>Shop ID</CustomTableCell>
              <CustomTableCell numeric>Phone No</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
               Object.values(this.state.data).map((type,index) => {
                
                 return (
                  <TableRow className={classes.row} key={type._id}>
                    <CustomTableCell>{type.emp_name}</CustomTableCell>
                    <CustomTableCell>{type.emp_cnic}</CustomTableCell>
                    <CustomTableCell numeric>{type.emp_type}</CustomTableCell>
                    <CustomTableCell numeric>{type.emp_phone}</CustomTableCell>
                    <CustomTableCell numeric>{type.shop_id}</CustomTableCell>
                    <CustomTableCell>
                      <Button  aria-label="delete" onClick={()=>{this.deleteClick(index)}} className={classes.button}>
                        <DeleteIcon />
                      </Button>
                    </CustomTableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </Paper>
      </div>
    );
  }
}


CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
