import React,{Component} from 'react' // means we are only importing 'Components' from react package
import './product.css'
import DataServices from '../services/dataservice.js';
import DataService from '../services/dataservice.js';
import NotificationService,{NOTIF_WISHLIST_CHANGED} from '../services/notification-service.js';


let ds=new DataService();
let ns=new NotificationService();
// 'className' in jsx ,is equivalent to 'class' in css
// all the className used below ie. card,card-block,etc r bootstrap classes
// whatever u want to return shd be enclosed by atleast 1 <div></div> tag
// each product will be a CARD ,,with a IMG,and a BLOCK with title,price,button
//note: in html there is no closing tag for <img>,,,,but u shld put a closing tag for everything in jsx


//content of each card will come from database

// product template which will be displayed on screen
class Product extends Component{
    constructor(props)
    { super(props);
        //defining state variable....in this case it will be a boolean variable,storing true/false
        this.state={isProductOnWishList:ds.ifProductOnWishList(this.props.product)}; 
         
        //bind function
        this.onButtonClicked=this.onButtonClicked.bind(this);
        this.onWishListChanged=this.onWishListChanged.bind(this);
    }
    ////   REACT APPLICATION LIFE-CYCLE FUNCTIONS/////////////////////////////////////////////
    componentDidMount()// when the component loads on screen for 1st time,this func is called
    {ns.addObserver(NOTIF_WISHLIST_CHANGED,this,this.onWishListChanged)}

    componentWillMount()//when the component is erased from memeory(when browser is closed),this func is called
    {ns.removeObserver(this,NOTIF_WISHLIST_CHANGED);}
    /////////////////////////////////////////////////////////////////////////////////////////
    //defining func
    onWishListChanged(latest_wishList)
    { this.setState({isProductOnWishList:ds.ifProductOnWishList(this.props.product)});
        //NOTE : the latest_wishlist is the latest wishlist,but we dont need it in this func
        //our AIM IS TO refresh the STATE VARIABLE of each PRODUCT template,when ever we add/remove something from wishList
    }
    //another func
    onButtonClicked=()=>
    { if(this.state.isProductOnWishList)
        {ds.removeWishListItem(this.props.product)}
      else
        {ds.addWishListItem(this.props.product);}  
    }
    render(){
        /////////////////////// DECIDING CLASS FOR THE BUTTON,BASED ON ..if item is added to wishlist or not
        var btnClass;
        if(this.state.isProductOnWishList)
            {btnClass="btn btn-danger"; }
         else
            {btnClass="btn btn-primary";}   
         ///////////////////////   
        return(
            <div className="card product">
               <img className="card-img-top" src={this.props.product.imgUrl} alt="Product"></img>
               <hr></hr>
               <div className="card-block">
                    <h4 className="card-title">{this.props.product.title}</h4>
                    <p className="card-text">Price: ${this.props.product.price}</p>
                    <a href="#" onClick={()=>this.onButtonClicked()} className={btnClass}>{this.state.isProductOnWishList ?"remove from cart :(":"Add To Cart :)"}</a>               
               </div>           
            </div>
        );

    }
    // props are the attributes given to the <Product/> tag...in App class render() meathod 
    // props are actually properties,passed from top component to its children,
}

export default Product;
//THIS WILL NOW BE USED AS A TAG in render of App.js...ie <Product/>