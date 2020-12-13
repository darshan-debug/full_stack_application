import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
//Components
import Product from '../product/product.js';// product template which will be displayed on screen,by using it as a tag in render()
import WishList from '../wishlist/wishlist.js';
//Services
import HttpService from '../services/http-service.js';

const http=new HttpService();
//////////////////////////////////////////////////////////////
class App extends Component{
   constructor(props){
     super(props);
     //using state 
     this.state={products:[]};
     //bind function(EVER FUNCTION SHOULD BE BIND-ED)
     this.loaddata=this.loaddata.bind(this);
     this.productList=this.productList.bind(this); 
     //FUNCTION CALL
     this.loaddata();
     
   }
   //a function
   loaddata=()=>{
      //REMEMBER WEB-REQUEST ARE ASYNCHRONOUS
      //therefore we are saving the reference to "this",before calling getProducts().....as it is ASYNCHRONOUS
      var self=this;
      http.getProducts().then(databasedata=>{self.setState({products:databasedata})},err=>{});
      //setState() reloads that component and inner components
      //loaddata() func is called when page is loaded,it will collect data from DB,and save in a STATE..("products" in this case)

   } 

   //a function to  take data from STATE VARIABLE ->products.....and pass it on to "Product" tag as props(attributes),,to display them 
   productList=()=>{
     //map meathod is used loop through each item in array,AND..(productJSON)=>{}..is called for each item in array
     //whenever u r working with list,have a unique identifier for each item,so only we are using "_id"
      const list=this.state.products.map((productJSON)=>
            <div className="col-sm-4" key={productJSON._id}>
                <Product product={productJSON}/>
            </div>
      );
      return list;

   }
//////////////////////////////////////////////////////////////////////////////////
   render(){
  return (
    <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />  
          </header>
          <div className="container-fluid App-main">
              <div className="row">
                <div className="col-sm-8">
                    <div className="row">
                         {this.productList()}
                    </div>                    
                </div>
                <div className="col-sm-4">
                     <WishList/>
                </div>         
                  
              
              </div>  
                     
          </div>

    </div>
  );
}}

export default App;
