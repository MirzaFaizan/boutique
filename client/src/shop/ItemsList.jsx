import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText,ListItemSecondaryAction } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AddIcon from '@material-ui/icons/Add';
import IconButton from 'material-ui/IconButton';


const styles = theme => ({
  root: {
    width: '100%',
 
    backgroundColor: theme.palette.background.paper,
  },
});

function SimpleList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      
      
      <List component="nav">
        <ListItem button>
          <ListItemText primary="Item Name " />

          <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
        </ListItem>
        <ListItem button component="a" href="#simple-list">
          <ListItemText primary="Item Name " />

          <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);