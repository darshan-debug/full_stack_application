import React,{Component} from 'react';
import './productcondensed.css';
import DataService from '../services/dataservice.js';

let ds=new DataService();


class ProductCondensed extends Component{
    constructor(props)
    { super(props);
      //BIND FUNCTION
      this.removeProduct=this.removeProduct.bind(this);
    }
    //defining func
    removeProduct=()=>{ds.removeWishListItem(this.props.product);}

    // NOTE: as wishList is already a observer to NOTIFICATIONS,thus it will automatically refresh ,when the cross red button is clicked.........thus no extra code needed for that,(as we required for product.js)
    ///////////////
    render(){
        return(
            <li className="list-group-item pc-condensed">  
                <div className="row">
                    <div className="col-sm-2">
                        <a className="btn btn-outline-danger" onClick={()=>this.removeProduct()}>X</a>
                    </div>
                    <div className="col-sm-10">
                        <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
                     </div>
                
                </div>              
                    
                               
                               
            </li>
        );
    }
}

export default ProductCondensed;