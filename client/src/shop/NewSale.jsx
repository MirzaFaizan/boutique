import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import NumericInput from 'react-numeric-input';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AddIcon from '@material-ui/icons/Add';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText,ListItemSecondaryAction } from 'material-ui/List';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from 'material-ui/Chip';




const styles = theme => ({
  root: {
    flexGrow: 1,
  },paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    
  },
  menu: {
    width: 200,
  },
  table: {
    width: '100%',
  },
  select:{
    width:'100%',
  },
  prntBtn:{
    width:'100%',
    marginTop:theme.spacing.unit *2,
    height:'60px'
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});


const suggestions = [].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
  price : suggestion.price,
}));

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}
function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

const ITEM_HEIGHT = 48;


class TextFields extends React.Component {
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


  state = {
    sr: [1,2,3],
    data:{name:'Item Name',price:5500},
    t:this.props.token,
    multiLabel: [],
    price:[],
    displayTable:'',
    dummy:'',
    data:{}
  };

  
  handleChange = name => value => {
    this.setState({
      [name]: value,
    });

    const {displayTable} = this.state;
    const newDisplay = [displayTable];
    newDisplay.push(<TableRow>
        <TableCell></TableCell>
        <TableCell >{this.state.multiLabel}</TableCell>
        <TableCell numeric>-</TableCell>
      </TableRow>);
      this.setState({
          displayTable : newDisplay
      })
    

  };

  render() {
    const { selectedOption } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <Grid container spacing={24}>

        <Grid item xs={12} sm={5}>
          <Paper className={classes.paper}>
          
      <form className={classes.container} noValidate autoComplete="off"> 
       {/*<TextField
          id="name"
          label="Search Item "
          placeholder="Enter Item Name "
          className={classes.textField}
          margin="normal"
          fullWidth
       />  
        <Select
          name="form-field-name"
          value={value}
          onChange={this.addRow.bind(this)}
          options={data}
          className={classes.select}
          />*/}
          <TextField
          fullWidth
          value={this.state.multiLabel}
          onChange={this.handleChange('multiLabel')}
          placeholder="Search Items"
          name="react-select-chip-label"
          label="With label"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: SelectWrapped,
            inputProps: {
              classes,
              multi: true,
              instanceId: 'react-select-chip-label',
              id: 'react-select-chip-label',
              simpleValue: true,
              options: suggestions,
            },
          }}
        />
          <h2>Total : 0</h2>
          <Button variant="raised" color="primary" className={classes.prntBtn}  >Checkout</Button>
      </form>
      
      {/*<List component="nav">
        <ListItem>
          <ListItemText primary="Item Name " />

          <ListItemSecondaryAction>
                      <Button onClick={this.addRow.bind(this)}>Button</Button>
                      <IconButton aria-label="Add" >
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
        </ListItem>
        <ListItem button component="a" >
          <ListItemText primary="Item Name " />

          <ListItemSecondaryAction>
                      <IconButton aria-label="Add">
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
        </ListItem>
      </List>*/}


      </Paper>
        </Grid>
      
        <Grid item xs={12} sm={7}>
       
        <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>SR # </TableCell>
            <TableCell >Item Name </TableCell>
            <TableCell numeric>Price</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.displayTable}
        { Object.values(this.state.data).map((type,i) => {
  console.log(type)
  suggestions.push({value:type.item_name,label:type.item_name,price:type.price})
})
}
          
        </TableBody>
      </Table>
    
    </Paper>
        </Grid>
      </Grid>
      
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
