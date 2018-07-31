import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
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


const dropdowntypes = [
  {
    value: 'Men Clothing',
    label: 'Men Clothing',
  },
  {
    value: 'Women Clothing',
    label: 'Women Clothing',
  },
  {
    value: 'Jewelry',
    label: 'Jewelry',
  },
  {
    value: 'Ladies Bag',
    label: 'Ladies Bag',
  },
  {
    value: 'Peshawari Chappal',
    label: 'Peshawari Chappal',
  },
  {
    value: 'Home Decor',
    label: 'Home Decor',
  },
];


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
      'token':this.state.t,
      'type':'Men Clothing',
  };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch('/head/findbytype', {
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
      data:{},
      t:this.props.token,
    }
};

changeType = e => {
  this.setState({
    type: e.target.value
  });

  var details = {
    'token':this.state.t,
    'type':this.state.type,
};
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  fetch('/head/findbytype', {
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


}

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
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
      <Typography variant="display2"> Items by category</Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Product Name</CustomTableCell>
              <CustomTableCell>Price</CustomTableCell>
              <CustomTableCell >Date Added </CustomTableCell>
              <CustomTableCell >Size</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
               Object.values(this.state.data).map((type,index) => {
                 return (
                  <TableRow className={classes.row} key={index}>
                    <CustomTableCell>{type.item_name}</CustomTableCell>
                    <CustomTableCell numeric> {type.price} </CustomTableCell>
                    <CustomTableCell numeric> {type.date_added} </CustomTableCell>
                    <CustomTableCell numeric> {type.size} </CustomTableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}


CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
