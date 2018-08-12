import React from 'react';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button } from 'material-ui';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

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
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
  });

class DatePickers extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      t:this.props.token,
      date1:'',
      date2:'',
    };


  }

  setDate1 = e => {
      this.setState({
          date1:e.target.value
      })
      
  }
  setDate2 = e => {
    this.setState({
        date2:e.target.value
    })
  }
    checkData = () => {
      console.log(this.state.date1);
      console.log(this.state.date2);
        var details = {
            'token':this.state.t,
            'fromdate':this.state.date1,
            'todate':this.state.date2
          };
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
          
          fetch('/head/salesBetweenDates', {
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
              });
            };
            this.forceUpdate();
          }
          );
    }


    printSales=()=>{
        PrintJS('table','html')
    }

    renderData=()=>{
        const { classes } = this.props;
      if(this.state.data){
        return ( 
          <div id="table">
            <div>
                <Typography variant="display2" > All Sales</Typography>
                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell>Products</CustomTableCell>
                        <CustomTableCell>Total</CustomTableCell>
                        <CustomTableCell >Shop</CustomTableCell>
                        <CustomTableCell >Date</CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                        Object.values(this.state.data).map((type,index) => {
                        return (
                            <TableRow className={classes.row} key={index}>
                            <CustomTableCell>
                                {
                                    type.products.map((item)=>{
                                    return(item.item_name)+"," 
                                    })
                                    }
                                </CustomTableCell> 
                            <CustomTableCell>{type.total}</CustomTableCell>
                            <CustomTableCell numeric> {type.shop} </CustomTableCell>
                            <CustomTableCell numeric> {type.date_sale} </CustomTableCell>
                            </TableRow>
                        );
                        })
                    }
                    </TableBody>
                </Table>
                </Paper>
            </div>
          </div>
          )
      }
    }
    render() {

        const { classes } = this.props;
        return(
            <div>
                <form className={classes.container} noValidate>
                <TextField
                    id="date1"
                    label="From "
                    type="date"
                    defaultValue={new Date()}
                    onChange={e => this.setDate1(e)}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                </form>
                <form className={classes.container} noValidate>
                <TextField
                    id="date1"
                    label="To"
                    type="date"
                    defaultValue={new Date()}
                    onChange={e => this.setDate2(e)}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                 <Button variant="raised" color="primary" onClick={this.checkData}>Check</Button>

                 <Button variant="raised" color="primary" onClick={this.printSales}>Print sales</Button>
                </form>
                
                    {this.renderData()}
            </div>
        )
    }
}


DatePickers.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(DatePickers);