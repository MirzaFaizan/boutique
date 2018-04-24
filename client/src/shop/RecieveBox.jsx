import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
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
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
});
function validate(qrId) {
  return {
    qrId: qrId.length === 0,
  };
}
class TextFields extends React.Component {
  constructor(){
    super();
  this.state = {
    qrId:''
  }}
  handleQrChange = (evt) => {
    this.setState({ qrId: evt.target.value });
  }
  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { qrId} = this.state;
  }
  canBeSubmitted() {
    const errors = validate(this.state.qrId);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }
  render() {
    const errors = validate(this.state.qrId);
      const isDisabled = Object.keys(errors).some(x => errors[x]);
    const { classes } = this.props;
    return (
      <div>
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}> 
       <TextField
          id="recieveBox"
          label="Recieve Box "
          placeholder="Scan Box Qr Code "
          className={classes.textField}
          margin="normal"
          value={this.state.qrId}
            onChange={this.handleQrChange}
        />
        <Button color="primary" variant="raised" className={classes.button} disabled={isDisabled}>
        Recieve
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
