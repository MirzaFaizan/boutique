import React, { Component } from 'react';
import './App.css';
import ShopDrawer from './shop/Drawer';
import WarehouseDrawer from './warehouse/Drawer';
import HeadOfficeDrawer from './headoffice/Drawer';
import Login  from './warehouse/Login';


class App extends Component {

  /*componentWillMount(){

    if(this.state.IsLoggedInWarehouse===true){
      this.setState({
        onDisplay:<WarehouseDrawer/>
      })
    }
    else if(this.state.IsLoggedInHeadoffice===true){
        this.setState({
          onDisplay:<div>Head Office</div>
        })
    }
    else if(this.state.IsLoggedinShop===true){
      this.setState({
        onDisplay:<div>Shop</div>
      })
    }
    else {
      this.setState({
        onDisplay:<Login updateHeadOffice={this.updateHeadOfficeDisplay} updateWarehouse={this.updateWareHouseDisplay} updateShop={this.updateShopDisplay}/>
      })
    }
    }
    */

    constructor(props){
      super(props);
      this.state={
        /*
          IsLoggedInWarehouse:false,
          IsLoggedInHeadoffice:false,
          IsLoggedinShop:false,
        */
        onDisplay:<Login updateHeadOffice={this.updateHeadOfficeDisplay} updateWarehouse={this.updateWareHouseDisplay} updateShop={this.updateShopDisplay}/>
      }
      this.updateWareHouseDisplay.bind(this);
      this.updateShopDisplay.bind(this);
      this.updateHeadOfficeDisplay.bind(this);
      this.logoutFunction.bind(this);
    }
  updateWareHouseDisplay = (token) => {
    console.log(token);
    //now send token to the required component
    this.setState({
      IsLoggedInWarehouse:true,
      onDisplay:<WarehouseDrawer token={token} logoutScreen={this.logoutFunction}/>
    })
  }

  updateShopDisplay = (token) => {
    this.setState({
      IsLoggedinShop:true,
      onDisplay:<ShopDrawer token={token} logoutScreen={this.logoutFunction}/>
    })
  }

  updateHeadOfficeDisplay = (token) => {
    console.log(token)
    this.setState({
      IsLoggedInHeadoffice:true,
      onDisplay:<HeadOfficeDrawer token={token} logoutScreen={this.logoutFunction}/>
    })
  }

  logoutFunction = () => {
    console.log('logging out')
    this.setState({
      onDisplay: <Login  updateHeadOffice={this.updateHeadOfficeDisplay} updateWarehouse={this.updateWareHouseDisplay} updateShop={this.updateShopDisplay}/>
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.onDisplay}
      </div>
    );
  }
}

export default App; 