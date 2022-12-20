
/*
Frontend logic for the Application
*/
//Container for the frontend application
const app = {}


app.config = {
    'sessionToken': false
}

//AJAX client for the REST API

app.client = {};

//Interface for the API calls

app.client.request = function(headers,path,method,queryStringObject,payload,callback){
    //set default values for the parameters
    headers = typeof(headers) == 'object' && headers !== 'null' ? headers : {};
    path = typeof(path) == 'string' ? path : '/'
    method = typeof(method) == 'string' && ['POST', 'PUT', 'DELETE','GET'].indexOf(method) > -1 ? method.toUpperCase() : 'GET'
    queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {}; queryStringObject
    payload = typeof(payload) == 'object' && payload !== null ? payload : {}; payload
    callback = typeof(callback) == 'function' ? callback : false


}