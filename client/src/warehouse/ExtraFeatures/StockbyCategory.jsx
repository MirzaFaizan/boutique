import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from 'material-ui/TextField';

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
    minWidth: 700,
  },
  tablehead : {
    align:'center',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const dropdowntypes = [
    {
      value: 'Women Clothing',
      label: 'Women Clothing',
    },
    {
      value: 'Men Clothing',
      label: 'Men Clothing',
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

class CustomizedTable extends React.Component {


    search = () => {
    {
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
     
     
     fetch('/admin/findbytype', {
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
        this.setState({
          data:res
        })
       };
     }
     );   
    }
    }


  changeType = e => {
    console.log(e.target.value);
    this.setState({
      type: e.target.value
    });

}

  constructor(props){
    super(props);
    
    this.state = {
      t:this.props.token,
      data:{},
      id:'',
      type: 'Women Clothing',
    }
  }
  render() {
    const { classes } = this.props;

  return (
    <Paper className={classes.root}>
    {/*<Search/>*/}
    <TextField
          id="type"
          select
          className={classes.textField2}
          value={this.state.type}
          onChange={e=>this.changeType(e)}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        > {dropdowntypes.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </TextField>
          <Button onClick={this.search} color='primary'>Search</Button>
      <Table className={classes.table}>
        <TableHead className={classes.tablehead}>
          <TableRow>
          <CustomTableCell>Sr No.</CustomTableCell>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell >Type</CustomTableCell>
            <CustomTableCell >Price</CustomTableCell>
            <CustomTableCell >Date</CustomTableCell>
            <CustomTableCell >ID</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*data to be replaced with json pacakage from api*/}
          {Object.values(this.state.data).map((type,index) => {
                 console.log(type);
                 return (
                  <TableRow className={classes.row} key={type._id} selectable={true}>
                    <CustomTableCell>{index+1}</CustomTableCell>
                    <CustomTableCell>{type.item_name}</CustomTableCell>
                    <CustomTableCell >{type.item_type}</CustomTableCell>
                    <CustomTableCell >{type.price}</CustomTableCell>
                    <CustomTableCell >{type.date_added}</CustomTableCell>
                    <CustomTableCell >{type.id2}</CustomTableCell>
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
