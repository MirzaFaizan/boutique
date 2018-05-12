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


const styles = theme => ({
  button: {
    margin:theme.spacing.unit,
    display:'flex',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '25%',
  },
  menu: {
    width: 200,
  },
});


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
    type: '',
    price: '',
    id: '',
    date:new Date(),
    t:this.props.token,
    QRImg: {},
  };

  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { name,type,price,id} = this.state;
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
  }

  changePrice = e => {
    this.setState({
      price: e.target.value
    });
  }

  

  list = {}
  qrimg = null
  handleClick = () => {
    var qr_svg = qr.image('I love QR!', { type: 'png' });
    var svg_string = qr.imageSync(this.state.id, { type: 'png' });
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
      "<body class='container'><div class='row'>"+
        "<div class='col-md-4'></div><div class='col-md-4' style='border: 2px solid;'>"+
          "<div class='row'><div class='col-md-6'>"+
                "<ul style='list-style-type: square'>"+
                  "<strong>Poshwear studio</strong>"+
                  "<li>"+this.state.name+"</li>"+
                  "<li>"+this.state.type+"</li>"+
                  "<li>"+this.state.price+"</li>"+
                "</ul></div>"+
            "<div class='col-md-6'><img src='"+this.b64encoded+"' alt='img here'></div>"+
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
        'id':this.state.id,
        'date':this.state.date,
        'token':this.state.t
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
      type:'',
      price:'',
      id:'',
      t:this.props.token,
    })
  }

    //posting data to api call here
  render() {
    const { classes } = this.props;
    const errors = validate(this.state.name,this.state.type,this.state.price,this.state.id);
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
         label="Type"
         value={this.state.type}
         placeholder="Enter Type of Product"
         onChange={e => this.changeType(e)}
         className={classes.textField}
         margin="normal"
       />
         
       <TextField
         id="price"
         label="Price"
         value={this.state.price}
         placeholder="Enter Price of Product"
         onChange={e => this.changePrice(e)}
         className={classes.textField}
         margin="normal"
       />

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
