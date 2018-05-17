import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from 'material-ui/Icon';
import qr from 'qr-image';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';


const styles = theme => ({
  button: {
    margin:theme.spacing.unit,
    display:'flex',
    marginTop: '5%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '25%',
    marginTop: '5%'
  },
  textField2: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '25%',
    marginTop: '6%'
  },
  menu: {
    width: 200,
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

const sizetypes = [
  {
    value: 'large',
    label: 'Large',
  },
  {
    value: 'medium',
    label: 'Medium',
  },
  {
    value: 'small',
    label: 'Small',
  },
  {
    value: '6',
    label: '6',
  },
  {
    value: '7',
    label: '7',
  },
  {
    value: '8',
    label: '8',
  },
  {
    value: '9',
    label: '9',
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '11',
    label: '11',
  },
  {
    value: '12',
    label: '12',
  },
  {
    value: '13',
    label: '13',
  },
  {
    value: '14',
    label: '14',
  },
];


function validate(name,type,price) {
  return {
    name: name.length === 0,
    type: type.length === 0,
    price: price.length === 0
  };
}

class TextFields extends React.Component {

    state = {
    name: '',
    type: 'Women Clothing',
    price: '',
    newid: 'pw-wc-',
    date:new Date(),
    t:this.props.token,
    QRImg: {},
    isDisabled:true,
    isDisabledsize:true,
    size:'large'
  };

  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { name,type,price,newid} = this.state;
  }
  canBeSubmitted() {
    const errors = validate(this.state.name,this.state.type,this.state.price);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleChange = name => event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state)
  };

  //change function
  changeName = e => {
    this.setState({
      name: e.target.value
    });
  };

  changeType = e => {
    this.setState({
      type: e.target.value
    });
    if(this.state.type==='Women Clothing')
    {
      this.setState({
        newid:'pw-wc-',
        isDisabledsize:true,
      })
    }
    if(this.state.type==='Men Clothing')
    {
      this.setState({
        newid:'pw-gc-',
        isDisabledsize:false,
      })
    }
    if(this.state.type==='Jewelry')
    {
      this.setState({
        newid:'pw-jw-',
        isDisabledsize:true,
      })
    }
    if(this.state.type==='Ladies Bag')
    {
      this.setState({
        newid:'pw-lb-',
        isDisabledsize:true,
      })
    }
    if(this.state.type==='Peshawari Chappal')
    {
      this.setState({
        newid:'pw-pc-',
        isDisabledsize:false,
      })
    }
    if(this.state.type==='Home Decor')
    {
      this.setState({
        newid:'pw-hd-',
        isDisabledsize:true,
      })
    }
  }

  changePrice = e => {
    this.setState({
      price: e.target.value
    });
  }

  changesize = e => {
    this.setState({
      size:e.target.value
    })
  }

  list = {}
  qrimg = null
  handleClick = () => {
    var qr_svg = qr.image('I love QR!', { type: 'png' });
    var svg_string = qr.imageSync(this.state.newid, { type: 'png' });
    var decoder = new TextDecoder('utf8');
    var b64encoded = btoa(String.fromCharCode.apply(null, svg_string));
    b64encoded = "data:image/gif;base64,"+b64encoded;
    console.log({b64encoded});
    if(b64encoded){
      this.qrimg={b64encoded};
    }
    var popup = window.open();
    popup.document.write("<html><head><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'>"
      +"<title>Print This</title></head>"+
      "<body class='container'><div style='margin-top:20%;'><div class='row'>"+
        "<div class='col-md-4'></div><div class='col-xs-4' style='border: 2px solid;'>"+
          "<div class='row'><div class='col-xs-6'>"+
                "<ul style='list-style-type: square; padding-top:20px'>"+
                  "<strong>Poshwear studio</strong>"+
                  "<li>"+this.state.name+"</li>"+
                  "<li> Size : "+this.state.size+"</li>"+
                  "<li>Rs "+this.state.price+"/-</li>"+
                  "<li>"+this.state.newid+"/-</li>"+
                "</ul></div>"+
            "<div class='col-md-6'><img src='"+this.qrimg.b64encoded+"' alt='img here'></div>"+
            "</div></div><div class='col-md-4'></div></div></body></html>"
    );
    popup.focus();
    console.log(this.qrimg);
    console.log(this.state);
    console.log(this.props.token);
    //api call to store data in database here
      console.log(this.state)
      var details = {
       'name': this.state.name,
       'price': this.state.price,
       'type':this.state.type,
        'newid':this.state.newid,
        'date':this.state.date,
        'token':this.state.t,
        'size':this.state.size
   };
   
   var formBody = [];
   for (var property in details) {
     var encodedKey = encodeURIComponent(property);
     var encodedValue = encodeURIComponent(details[property]);
     formBody.push(encodedKey + "=" + encodedValue);
   }
   formBody = formBody.join("&");
   
   fetch('/admin/addArticle', {
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
      this.props.handleopen();
       console.log("After function");

     }
     else{
       this.props.handleError();
     }
     ;
   }
   );  //form saaf kia hai 
    this.setState({
      name:'',
      type:'Women Clothing',
      price:'',
      newid:'pw-wc-',
      t:this.props.token,
      size:'large',
      isDisabledsize:true
    })
  }

    //posting data to api call here
  render() {
    const { classes } = this.props;
    const errors = validate(this.state.name,this.state.type,this.state.price,this.state.newid);
      const isDisabled = Object.keys(errors).some(x => errors[x]);

    return (
      <div>
        <Typography variant="display2"> Add an Item</Typography>
        <form className={classes.container} noValidate autoComplete="off"> 
      
      <TextField
         id="name"
         label="Name"
         value={this.state.name}
         placeholder="Enter Name of Product"
         className={classes.textField}
         onChange={e => this.changeName(e)}
         margin="normal"
         refs='name'
         
       />
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
         
       <TextField
         id="price"
         label="Price"
         value={this.state.price}
         placeholder="Enter Price of Product"
         onChange={e => this.changePrice(e)}
         className={classes.textField}
         margin="normal"
       />

          <TextField
          id="size"
          select
          className={classes.textField2}
          value={this.state.size}
          onChange={e=>this.changesize(e)}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {sizetypes.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </TextField>

         
        {/*
        <TextField
         id="id"
         label="ID"
         value={this.state.id}
         placeholder="Enter ID of Product"
         onChange={e => this.changeID(e)}
         className={classes.textField}
         margin="normal"/>
        */} 

       <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClick} disabled={isDisabled}>
       <AddIcon/>
       </Button>
     </form>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
