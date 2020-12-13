import 'whatwg-fetch';
// GO AND READ DOCUMENTATIONS FOR whatwg-fetch
class HttpService{
   getProducts=()=>{
       var promise=new Promise((resolve,reject)=>{
        fetch("http://localhost:3004/product")
        .then(response=>{resolve(response.json()) }) 
       });
        
    return promise;
   }
}

export default HttpService;


// IMPORTANCE OF PROMISE
// without promise,,the data received from httpService...wont be available in App.js..
// promise makes the data available,in app.js and we use it,from then on