import React from 'react';;

export default class extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      t:this.props.token,
    };


  }
  componentWillMount(){
    var details = {
      'token':this.state.t
  };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    fetch('/head/fetchstatistics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
      },
      body: formBody
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      console.log("we are in this function");
      console.log(this.state.t);
      console.log(res);
      if(res!=undefined){
          Object.values(res).map((type,index)=> {
            myDataSource.data[index].label=type.date_sale;
            myDataSource.data[index].value=type.total
          })

      };
    }
    );
    console.log(myDataSource.data)

  };
    render() {
        return(
            <ReactFC {...chartConfigs}/>
        )
    }
}