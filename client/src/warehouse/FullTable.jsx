import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Search from './DropDownSelect';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


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
 
 
 fetch('/admin/ShowArticles', {
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
    //console.log(res);
    this.setState({
      data:res
    })
     //console.log("After function");
   };
 }
 );   
}

  deleteClick = (index) => {
    console.log({index})
    console.log(this.state.data[index])
    var details = {
      'token':this.state.t,
      'id':this.state.data[index].item_id,
  };
  
 
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  
  fetch('/admin/DeleteArticle', {
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
  
  
  fetch('/admin/ShowArticles', {
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
     //console.log(res);
     this.setState({
       data:res
     })
      //console.log("After function");
    };
  }
  );   
      console.log("After function");
    };
  }
  ); 

  }

  deleteClickHandler = () => {
    this.setState({
      isDisabled:false,
      buttonisDisabled:false,
    })
  }

  constructor(props){
    super(props);
    
    this.state = {
      t:this.props.token,
      data:{},
      id:'',
      
    }

   this.deleteClick =  this.deleteClick.bind(this);
  }
  render() {
    const { classes } = this.props;
{/*

}*/}
  return (
    <Paper className={classes.root}>
    {/*<Search/>*/}
      <Table className={classes.table}>
        <TableHead className={classes.tablehead}>
          <TableRow>
          <CustomTableCell>Sr No.</CustomTableCell>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell >Type</CustomTableCell>
            <CustomTableCell >Price</CustomTableCell>
            <CustomTableCell >Date</CustomTableCell>
            <CustomTableCell >ID</CustomTableCell>
            <CustomTableCell >Delete</CustomTableCell> 
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
                    <CustomTableCell >{type._id}</CustomTableCell>
                    <CustomTableCell >
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
  );
}
  }
  

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
