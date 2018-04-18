import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from 'material-ui/Divider';
import Paper from "material-ui/Paper"
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import NewSale from './NewSale';
import Table from './FullTable';
import AddEmployee from './AddEmployee';
import ViewEmployees from './ViewEmployessTable';
import createBrowserHistory from 'history/createBrowserHistory';


import { 
    Router,
    Route
    }   from 'react-router-dom';
import FullTable from './FullTable';
import Notification from './Notifications';

const customHistory = createBrowserHistory();
const drawerWidth = 240;

const theme2 = createMuiTheme({
    overrides: {
      MuiButton: {
        // Name of the styleSheet
        root: {
          // Name of the rule
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          borderRadius: 3,
          border: 0,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
          width:'100%',
        },
      },
    },
  });


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 'auto',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    position:'relative',
    height:'100%'
  },
});



class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    OnDisplay: <NewSale/>,
    title : "New Sale"
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

 NewSaleHandleClick = () => {

    this.setState({
        OnDisplay:<NewSale/>,
        title:"New Sale "
    }
  )
    console.log("ADd item on click")
  }

  RecieveItemsHandleClick = () => {

    this.setState({
        OnDisplay:<AddEmployee/>,
        title:"Recieve"
    })
    console.log("ADd item on click")
  }

  StockHandleClick = () => {

    this.setState({
        OnDisplay:<FullTable/>,
        title:"Stock"
    })
    console.log("ADd item on click")
  }
  ViewEmployessHandleClick = () => {

    this.setState({
        OnDisplay:<ViewEmployees/>,
        title:"Employees"
    })
    console.log("ADd item on click")
  }
  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <Router history={customHistory}>
        <Paper>
        <List>
        <Typography variant="title" color="inherit" noWrap>
        <MuiThemeProvider theme={theme2}>
           <ListItem><Button onClick={this.NewSaleHandleClick.bind(this)} >New Sale </Button></ListItem>
           <Divider />
            <ListItem><Button onClick={this.RecieveItemsHandleClick.bind(this)}>Recieve</Button></ListItem>
            <Divider/>
            <ListItem><Button onClick={this.StockHandleClick.bind(this)} >Stock</Button></ListItem>
            <Divider />
            <ListItem><Button onClick={this.ViewEmployessHandleClick.bind(this)}>View Employees</Button></ListItem>
            <Divider/>
            
            {/*<ListItem>Queue Details</ListItem>*/}
            </MuiThemeProvider>
            </Typography>
        </List>
        </Paper>
        </Router>
        
      </div>
    );

    return (
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon/>
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                {this.state.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.state.OnDisplay}
            <Notification/>
            {/*<Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>*/}
          </main>
         
        </div>
      );
    }
  }
  
  ResponsiveDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);