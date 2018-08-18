import React from 'react';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

export default class FormDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            token: this.props.token,
            data:[]
          };
    }
  
    componentWillMount(){
        this.props.data.items.map((item)=>{
            
            var details = {
                'token':this.props.token,
                'id':item
            };
            
           
            var formBody = [];
            for (var property in details) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            
            
            fetch('/admin/Show1Article', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
              },
              body: formBody
            })
            .then(res=>res.json())
            .then(res=>{
           
              if(res&& res!="No Article With this id"){
               var temp = this.state.data;
               if(temp!= undefined)
                temp.push(res);
               this.setState({
                   data:temp
               })
              };
            }
            );

        });
    }

    handleClickOpen = () => {
      this.setState({ open: true });
      console.log("state",this.state.data);
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

  
    render() {
      return (
        <div>
          <Button onClick={this.handleClickOpen}>Details</Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                  Following are the details of your package
              </DialogContentText>
                    <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>For Shop</TableCell>
                            <TableCell>Date Sent</TableCell>
                            <TableCell> Package ID </TableCell>
                            <TableCell> Status </TableCell>
                        </TableRow>
                    </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell>{this.props.data.shop_id}</TableCell>
                                <TableCell>{this.props.data.date_sent}</TableCell>
                                <TableCell>{this.props.data.package_number}</TableCell>
                                <TableCell>{this.props.data.status}</TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>

                   <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Price</TableCell>
                            <TableCell numeric>ID</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                        Object.values(this.state.data).map((type,index) => {
                            return (
                            <TableRow  key={index}>
                                <TableCell>
                                    {type.item_name}
                                </TableCell> 
                                <TableCell>{type.price}</TableCell>
                                <TableCell numeric> {type.id2} </TableCell>
                            </TableRow>
                            );
                        })
                        }
                    </TableBody>
                    </Table> 
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Okay
              </Button>
              
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }