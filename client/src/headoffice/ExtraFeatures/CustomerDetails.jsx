import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { Button } from 'material-ui';
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
    
    fetch('/head/fetchcustdetails', {
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

  Print=()=>{
    PrintJS('table','html');
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div id='table'>
          <Typography variant="display2"> All Customers</Typography>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Name</CustomTableCell>
                  <CustomTableCell numeric>Phone</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*data replaced with json pacakage from api*/}
                {
                  Object.values(this.state.data).map((type,index) => {
                    return (
                      <TableRow className={classes.row} key={index}>
                        <CustomTableCell>{type.customerName}</CustomTableCell>
                        <CustomTableCell numeric> {type.customerPhone} </CustomTableCell>
                      </TableRow>
                    );
                  })
                }
              </TableBody>
            </Table>
          </Paper>
        </div>
        <Button variant="raised" color="primary" onClick={this.Print}>Print</Button>
      </div>
    );
  }
}


CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
