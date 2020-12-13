export const NOTIF_WISHLIST_CHANGED="notif_wishlist_changed";
// the above const is name of a notification



// we store a list of observers
//a observer is a class or Component
var observers={};//this is a object,containing multiple arrays
let instance=null;
// HERE ALSO WE USE SINGLETON principle.....as used in dataservice
class NotificationService
{ constructor()
    {   if(!instance)
            {instance=this;}
        return instance;
    }
    /// NOW DEFINING FUNCTIONS
    addObserver=(notifName/*name of notification,u want to register for*/,observer/*the component that wants to be notified*/,callBack/*a function,which will be called,when there is a notification */)=>
    { let obs=observers[notifName];
       if(!obs)//when there is no observer,registered for that particular notification
          {observers[notifName]=[];} 

        //now registering the observer,for that notification  
        let obj={observer:observer,callBack:callBack}
        observers[notifName].push(obj);
    }

    removeObserver=(observer/*this 'observer',will no more receive notifications for 'notifName' */,notifName)=>
    { var obs=observers[notifName];
        if(obs)// if already there r 0 observers,for 'notifName' then dont do anything
        {  for(var x=0;x<obs.length;x++)
                {  if(observer===obs[x].observer)
                        { obs.slice(x,1);
                          observers[notifName]=obs;
                          break;
                        }
                }
        }
    }
    //the below func will be called by dataservice,whenever we add/remove a item from wishlist
    postNotification=(notifName,data)=>
    { let obs=observers[notifName];
        for(var x=0;x<obs.length;x++)
        {   var obj=obs[x];
            obj.callBack(data);
            //data--->is actually the latest wishlist,at the moment
        }
    }      
}


export default NotificationService;

