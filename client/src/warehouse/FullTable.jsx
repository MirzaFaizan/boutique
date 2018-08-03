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

   if(res){
    this.setState({
      data:res
    })
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
 
    if(res){
     this.setState({
       data:res
     })
    };
  }
  );   
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


  //search feature

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
    });
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
  
  
  fetch('/admin/ShowArticles', {
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

  render() {
    const { classes } = this.props;

  return (
    <Paper className={classes.root}>
    {/*<Search/>*/}
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
                 return (
                  <TableRow className={classes.row} key={type._id} selectable={true}>
                    <CustomTableCell>{index+1}</CustomTableCell>
                    <CustomTableCell>{type.item_name}</CustomTableCell>
                    <CustomTableCell >{type.item_type}</CustomTableCell>
                    <CustomTableCell >{type.price}</CustomTableCell>
                    <CustomTableCell >{type.date_added}</CustomTableCell>
                    <CustomTableCell >{type.id2}</CustomTableCell>
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
