// WE USE ES6 SINGLETON PRINCIPLE HERE....
//ie....every class involved in dataservice....will have only 1 object..ie only 1 instance
// for bigger projects...professionals use REDUX

import NotificationService,{NOTIF_WISHLIST_CHANGED} from './notification-service.js';
//the above statement imports a const,which is actually a notification name
let ns=new NotificationService();// as it is a SINGLETON ,thus only 1 instance can exist at any point of time
//we will post notification--->whenever we add/remove a item from wishlist

let instance=null;
var wishList=[];

class DataService
{   constructor()
    {   if(!instance)
            {instance=this;}
        return instance;    
    }
    // now defining functions
    addWishListItem=item=>
    {   //check if the item is in wishList ALREADY,...if so.. do nothing
         for(var x=0;x<wishList.length;x++)
        { if(wishList[x]._id===item._id){return;} }

        // the item is not is wishlist..so add it
        wishList.push(item);
        //now posting notification
     ns.postNotification(NOTIF_WISHLIST_CHANGED,wishList);
        //we are passing the latest 'wishlist',with the notification
    
    }
    removeWishListItem=item=>
    { for(var x=0;x<wishList.length;x++)
        { if(wishList[x]._id===item._id)
                {wishList.splice(x,1);
                  //now posting notification
                  ns.postNotification(NOTIF_WISHLIST_CHANGED,wishList);
                 //we are passing the latest 'wishlist',with the notification
                 break;            
                }
        }
    }
    //below func will check if a product is in wishlist,this is used by STATE VARIABLE in product.js
    ifProductOnWishList=item=>
    {    for(var x=0;x<wishList.length;x++)
            { if(wishList[x]._id===item._id)
                    {return true;}
            }
            return false;
    }
}

export default DataService;