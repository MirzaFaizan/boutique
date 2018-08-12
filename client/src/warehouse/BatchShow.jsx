import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import PrintJS from 'print-js';

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
 
 
 fetch('/admin/showPackages', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
   },
   body: formBody
 })
 .then(res=>res.json())
 .then(res=>{

   console.log("we are in this function");
   if(res){
    console.log(res);
    this.setState({
      data:res
    })
     console.log("After function");
   };
 }
 );
     
  }
  constructor(props){
    super(props);
    
    this.state = {
      t:this.props.token,
      data:{}
    }
  }
  render() {
    const { classes } = this.props;

  return (
    <div >
          <Paper id='table' className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {/*<CustomTableCell>Items</CustomTableCell>*/}
              <CustomTableCell numeric>Package Number</CustomTableCell>
              <CustomTableCell numeric>Shop ID</CustomTableCell>
              <CustomTableCell numeric>Status</CustomTableCell>
              <CustomTableCell numeric>Date Sent</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*data to be replaced with json pacakage from api*/}
            {Object.values(this.state.data).map((type) => {
                  console.log(type);
                  return (
                    <TableRow className={classes.row} key={type._id}>
                      {/*<CustomTableCell>{type.items}</CustomTableCell>*/}
                      <CustomTableCell numeric>{type.package_number}</CustomTableCell>
                      <CustomTableCell numeric>{type.shop_id}</CustomTableCell>
                      <CustomTableCell numeric>{type.status}</CustomTableCell>
                      <CustomTableCell numeric>{type.date_sent}</CustomTableCell>
                    </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      <Button color='primary' variant='raised' onClick={()=>{PrintJS('table','html')}}>Print</Button>
    </div>
  );
}
  }
  

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
