import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


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
   // width: 'auto',
    //height:'auto',
    //marginTop: theme.spacing.unit * 3,
  },
});




{/* */}

class CustomizedTable extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Typography variant="display4">Welcome</Typography>
        <Typography variant="display2">Select Options from Left Menu</Typography>
      </Paper>
    );
  }
}


CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
