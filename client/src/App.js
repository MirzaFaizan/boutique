import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {data: ''}

  componentDidMount() {
    var details = {
      'name': 'nerd',
      'password': '1234'
  };
  
  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  
  fetch('/head', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
    },
    body: formBody
  })
  .then(res=>res.json())
  .then(function(res){
    console.log("we are in this function");
    console.log(res);}
  );
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.data}
      </div>
    );
  }
}

export default App;