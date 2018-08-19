import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Card, {  CardContent } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

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
      width: '100%',
    },
    menu: {
      width: 200,
    },
    card: {
      marginLeft:100,
      marginRight:100,
      marginTop:10,
      //maxWidth: 350,
    },
  });
  
  const dropdowntypes = [
    {
      value: 'admin',
      label: 'WareHouse',
    },
    {
      value: 'shop',
      label: 'Shop',
    },
  ];

 class FormDialog extends React.Component {
  state = {
    open: false,
    name: this.props.prev.Emp_name,
    username: this.props.prev.Emp_username,
    password: this.props.prev.Emp_password,
    cnic: this.props.prev.Emp_cnic,
    type:this.props.prev.Emp_type,
    shopID:this.props.prev.shop_id,
    city:this.props.prev.Emp_city,
    zip:this.props.prev.Emp_zip,
    countryState:this.props.prev.Emp_state,
    phone:this.props.prev.Emp_phone,
    country:this.props.prev.Emp_country,
    shopaddress:this.props.prev.shop_address,
    nationality:this.props.prev.Emp_nationality,
    address:this.props.prev.Emp_address,
    mobile:this.props.prev.Emp_mobile,
    t:this.props.token,
    isDisabledshop:true,
  };
  
  componentDidMount=()=>{
    console.log(this.props.prev);
  }
  

    
        handleChange = name => event => {
          this.setState({
            name: event.target.value,
          });
          console.log(this.state)
        };
      
        //change function
        changeuserName = e => {
          this.setState({
            username: e.target.value
          });
        };
      
        //change name
        changeName = e => {
          this.setState({
            name: e.target.value
          });
        };
      
      
        changepassword = e => {
          this.setState({
            password: e.target.value
          });
        }
      
        changecnics = e => {
          this.setState({
            cnic: e.target.value
          });
        }
      
        changecity = e => {
          this.setState({
            city: e.target.value
          });
        }
      
        changezip = e => {
          this.setState({
            zip: e.target.value
          });
        }
        changephone = e => {
          this.setState({
            phone: e.target.value
          });
        }
        changemobile = e => {
          this.setState({
            mobile: e.target.value
          });
        }
      
        changenationality = e => {
          this.setState({
            nationality: e.target.value
          });
        }
        changeType = e => {
          this.setState({
            type: e.target.value,
          });
          if(e.target.value==='shop'){
            this.setState({
              isDisabledshop:false,
            })
          }
          else{
            this.setState({
              isDisabledshop:true
            })
          }
          console.log(this.state.isDisabledshop);
        }
      
      
        changeShopID = e => {
          this.setState({
            shopID: e.target.value
          })
        }
      
        changeShopAddress = e => {
          this.setState({
            shopaddress: e.target.value
          })
        }
      
        changestate = e => {
          this.setState({
            countryState: e.target.value
          })
        }
      
        changecountry = e => {
          this.setState({
            country: e.target.value
          })
        }
      
        changeaddres = e => {
          this.setState({
            address: e.target.value
          })
        }
      


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen}><EditIcon/></Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Employee Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
                Please modify the details that are to be changed
            </DialogContentText>
                <Card className={classes.card}>
                    <form className={classes.container} noValidate autoComplete="off"> 
                    <CardContent>
                    <TextField
                        id="username"
                        label="Username"
                        value={this.state.username}
                        placeholder="Enter User Name"
                        className={classes.textField}
                        onChange={e => this.changeuserName(e)}
                        margin="normal"
                        refs='name'
                        />
                        </CardContent>

                    <CardContent>
                    <TextField
                        id="Name"
                        label="Name"
                        value={this.state.name}
                        placeholder="Enter Name"
                        className={classes.textField}
                        onChange={e => this.changeName(e)}
                        margin="normal"
                        refs='name'
                        />
                        </CardContent>

                        <CardContent>
                        <TextField
                        id="password"
                        label="Password"
                        value={this.state.password}
                        placeholder="Enter Password"
                        onChange={e => this.changepassword(e)}
                        className={classes.textField}
                        margin="normal"
                        />
                        </CardContent>
                        <CardContent>
                        <TextField
                        id="cnic"
                        label="CNIC"
                        value={this.state.cnic}
                        placeholder="Enter CNIC"
                        onChange={e => this.changecnics(e)}
                        className={classes.textField}
                        margin="normal"
                        />
                        </CardContent>
                        <CardContent>
                        <TextField
                        id="city"
                        label="City"
                        value={this.state.city}
                        placeholder="Enter City"
                        onChange={e => this.changecity(e)}
                        className={classes.textField}
                        margin="normal"
                        />
                        </CardContent>
                        <CardContent>
                        <TextField
                        id="nationality"
                        label="Nationality"
                        value={this.state.nationality}
                        placeholder="Enter nationality"
                        onChange={e => this.changenationality(e)}
                        className={classes.textField}
                        margin="normal"
                        />
                        </CardContent>
                        <CardContent>
                        <TextField
                        id="Phone"
                        label="Phone"
                        value={this.state.phone}
                        placeholder="Enter Phone"
                        onChange={e => this.changephone(e)}
                        className={classes.textField}
                        margin="normal"
                        />
                        </CardContent>
                        <CardContent>
                        <TextField
                        id="country"
                        label="Country"
                        value={this.state.country}
                        placeholder="Enter City"
                        onChange={e => this.changecountry(e)}
                        className={classes.textField}
                        margin="normal"
                        />
                        </CardContent>
                        <CardContent>
                        <TextField
                        id="zip"
                        label="Zip"
                        value={this.state.zip}
                        placeholder="Enter Zip"
                        onChange={e => this.changezip(e)}
                        className={classes.textField}
                        margin="normal"
                        />
                        </CardContent>
                        <CardContent>
                        <TextField
                        id="mobile"
                        label="mobile"
                        value={this.state.mobile}
                        placeholder="Enter Mobile"
                        onChange={e => this.changemobile(e)}
                        className={classes.textField}
                        margin="normal"
                        />
                        </CardContent>
                        <CardContent>
                        <TextField
                        id="address"
                        label="address"
                        value={this.state.address}
                        placeholder="Enter Address"
                        onChange={e => this.changeaddres(e)}
                        className={classes.textField}
                        margin="normal"
                        />

                        </CardContent>
                        <CardContent>
                        <TextField
                        id="state"
                        label="State"
                        value={this.state.countryState}
                        placeholder="Enter State"
                        onChange={e => this.changestate(e)}
                        className={classes.textField}
                        margin="normal"
                        />
                        </CardContent>
                        <CardContent>
                        <TextField
                        disabled={this.state.isDisabledshop}
                        id="shopid"
                        label="Shop ID"
                        value={this.state.shopID}
                        placeholder="Enter Shop ID"
                        onChange={e => this.changeShopID(e)}
                        className={classes.textField}
                        margin="normal"
                        />
                        </CardContent>
                        <CardContent>
                        <TextField
                        disabled={this.state.isDisabledshop}
                        id="shopaddress"
                        label="Shop Address"
                        value={this.state.shopaddress}
                        placeholder="Enter Shop Address"
                        onChange={e => this.changeShopAddress(e)}
                        className={classes.textField}
                        margin="normal"
                        />
                        </CardContent>
                        <CardContent>
                        <TextField
                        id="type"
                        select
                        className={classes.textField}
                        value={this.state.type}
                        onChange={e=>this.changeType(e)}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        helperText="Please select your type"
                        margin="normal"
                        >
                        {dropdowntypes.map(option => (
                            <option key={option.value} value={option.value}>
                            {option.label}
                            </option>
                        ))}
                        </TextField>
                </CardContent>
                        </form>
                    </Card>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(FormDialog);