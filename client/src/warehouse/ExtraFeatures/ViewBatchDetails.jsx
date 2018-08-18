import React from 'react';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import DialogActions from 'material-ui/Dialog/DialogActions';
import DialogContent from 'material-ui/Dialog/DialogContent';
import DialogContentText from 'material-ui/Dialog/DialogContentText';
import DialogTitle from 'material-ui/Dialog/DialogTitle';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

export default class FormDialog extends React.Component {
    state = {
      open: false,
      token: this.props.token,
    };
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };


    componentWillMount(){
        console.log(this.props);
    }
  
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
                        <TableBody>
                            <TableRow>
                                <TableCell>For Shop :</TableCell>
                                <TableCell>Date Sent :</TableCell>
                                <TableCell>Package ID :</TableCell>
                                <TableCell>Status :</TableCell>
                            </TableRow>
                        </TableBody>
                    <TableHead>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell> ID </TableCell>
                        </TableRow>
                    </TableHead>
                    </Table>
                    {/* 
                    <TableBody>
                        {
                        Object.values(this.state.data).map((type,index) => {
                        
                            if(type.shop===this.props.shop){
                            return (
                            <TableRow className={classes.row} key={index}>
                                <TableCell>
                                    {
                                    type.products.map((item)=>{
                                        return(item.item_name)+"," 
                                    })
                                    }
                                </TableCell> 
                                <TableCell>{type.total}</TableCell>
                                <TableCell numeric> {type.date_sale} </TableCell>
                            </TableRow>
                            );
                        }})
                        }
                    </TableBody>
                    </Table> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }