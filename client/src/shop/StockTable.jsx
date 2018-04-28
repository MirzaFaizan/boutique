import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Select from './DropDownSelect';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3f51b5',
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

let id = 0;
function createData(name, sr, qty, price) {
  id += 1;
  return { id, name, sr, qty, price};
}

const data = [
  createData('Item name . . . . ', 184937, 56, 2450),
  createData('Item name . . . . ', 184937, 56, 2450),
  createData('Item name . . . . ', 184937, 56, 2450),
  createData('Item name . . . . ', 184937, 56, 2450),
  createData('Item name . . . . ', 184937, 56, 2450),
 
 
];

class  CustomizedTable extends React.Component {
  componentDidMount(){
    
    var details = {
      'token':this.state.t,
      'shopID':this.state.shop
  };
  console.log(details);
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
        console.log("Response : ");
        console.log(res);
      };
    }
    );
  };

  constructor(props){
    super(props)
    this.state={
      data:{},
      t:this.props.token,
      shop:'f10'
    }
    console.log('Constructor');
    console.log(this.state.t);

    var details = {
      'token':this.state.t,
      'shopID':this.state.shop
  };
};
  render()
  {
    const { classes } = this.props;  

  return (
    <Paper className={classes.root}>
    {/*<Select/>*/}
      <Table className={classes.table}>
        <TableHead>
        <TableRow>
            <CustomTableCell>Item Name</CustomTableCell>
            <CustomTableCell numeric>ID #</CustomTableCell>
            <CustomTableCell numeric>Price (Rs)</CustomTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {/*data replaced with json pacakage from api*/}
          {
               Object.values(this.state.data).map((type,i) => {
                console.log(type)
                 
                 return (
                  <TableRow className={classes.row}  key={i}>
                    <CustomTableCell>{type.item_name}</CustomTableCell>
                    <CustomTableCell numeric>{type.item_id}</CustomTableCell>
                    <CustomTableCell numeric>{type.price}</CustomTableCell>
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
