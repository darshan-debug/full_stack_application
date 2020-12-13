import React,{Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product-condensed/productcondensed.js';
import DataService from '../services/dataservice.js';
import NotificationService,{NOTIF_WISHLIST_CHANGED} from '../services/notification-service.js';

let ns =new NotificationService();
///////////////////////////////////////////////////////////////////////////////
class WishList extends Component{
    constructor(props)
    {super(props);
     //declaring state variable
     this.state={wishListtt:[]}   
     //bind functions
     this.createWishList=this.createWishList.bind(this); 
     this.onWishListChanged=this.onWishListChanged.bind(this);
    }
    ////   REACT APPLICATION LIFE-CYCLE FUNCTIONS/////////////////////////////////////////////
    componentDidMount()// when the component loads on screen for 1st time,this func is called
    {ns.addObserver(NOTIF_WISHLIST_CHANGED,this,this.onWishListChanged)}

    componentWillMount()//when the component is erased from memeory(when browser is closed),this func is called
    {ns.removeObserver(this,NOTIF_WISHLIST_CHANGED);}
    /////////////////////////////////////////////////////////////////////////////////////////
    createWishList=()=>
    {  const list=this.state.wishListtt.map((product)=><ProductCondensed product={product} key={product.id}/>);

        return list;
    }
    //another func
    onWishListChanged(latest_WishList)
    {this.setState({wishListtt:latest_WishList});}//setState() will refresh the whole wishListtt
    /////////////////////////////////////////////////////////////////////
    render(){
        return(
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title">Wish List</h4>
                    <ul className="list-group">
                         {this.createWishList()}   
                    </ul>                
                </div>            
            </div>
        );
    }
}

export default WishList;