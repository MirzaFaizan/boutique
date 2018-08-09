import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { CardContent } from 'material-ui/Card';

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
    
    fetch('/head/showPurchase', {
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
      expenses:'',
      description:'',
      date:'',
      name: '',
    }
}

changeExpenses = e => {
  this.setState({
    expenses: e.target.value
  });
};
changeName = e => {
    this.setState({
      name: e.target.value
    });
  };
changeDescription = e => {
  this.setState({
    description: e.target.value
  });
};
changeDate = e => {
  this.setState({
    date: e.target.value
  });
};

handleClick = () => {
  console.log('Add Click')
  var details = {
    'token':this.state.t,
    'price':this.state.expenses,
    'desc':this.state.description,
    'name':this.state.name,
    'level':'headoffice',
    'date':new Date()
};


var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");


fetch('/head/addPurchase', {
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

fetch('/head/showPurchase', {
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
  expenses:'',
  date:'',
  description:'',
  name:''
});
}


    //DELETE CLICK FUNCTION
    deleteClick=()=>{
        console.log('Add Click')
        var details = {
          'token':this.state.t,
          'price':this.state.expenses,
          'desc':this.state.description,
          'name':this.state.name,
          'level':'headoffice',
          'date':new Date()
      };
      
      
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      
      
      fetch('/head/addPurchase', {
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
      
      fetch('/head/showPurchase', {
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
        expenses:'',
        date:'',
        description:'',
        name:''
      });     
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
    id="expenses"
    label="Purchase Price"
    value={this.state.expenses}
    placeholder="Enter Price"
    className={classes.textField}
    onChange={e => this.changeExpenses(e)}
    margin="normal"
  />
  <TextField
    id="Description"
    label="Description"
    value={this.state.description}
    placeholder="Enter Description"
    onChange={e => this.changeDescription(e)}
    className={classes.textField}
    margin="normal"
  />
<CardContent>
  <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick.bind(this)} >
    Add
  </Button>
  </CardContent>
</form>
      <Typography variant="display2"> All Purchases</Typography>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell numeric>Name</CustomTableCell>
              <CustomTableCell numeric>Description</CustomTableCell>
              <CustomTableCell numeric>Price</CustomTableCell>
              <CustomTableCell numeric>Date</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
               Object.values(this.state.data).map((type,index) => {
                
                 return (
                  <TableRow className={classes.row} key={type._id}>
                    <CustomTableCell>{type.item_name}</CustomTableCell>
                    <CustomTableCell>{type.item_desc}</CustomTableCell>
                    <CustomTableCell numeric>{type.price}</CustomTableCell>
                    <CustomTableCell numeric>{type.date_added}</CustomTableCell>
                    
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
