
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

    //for each querystring parameter sent, add it to the path
    let requestUrl = path+'?'
    let counter = 0;
    for (let queryKey in queryStringObject) {
        if(queryStringObject.hasOwnProperty(queryKey)) {
            counter += 1;
            //if at least one parameter has already been added, prepend new ones with an ampersand
            if(counter > 1){
                requestUrl+='&'
            }
            //Add the key and value
            requestUrl+=queryKey+'='+queryStringObject[queryKey]
        }
    }
    //form the http request as a json format
    const xhr = new XMLHttpRequest()
    xhr.open(method,requestUrl,true)
    xhr.setRequestHeader('Content-Type','application/json')

    //for each header sent, add it to the request
    for (const headerKey in headers){
        if(headers.hasOwnProperty(headerKey)){
            xhr.setRequestHeader(headerKey,headers[headerKey])
        }
    }
    //if there is a current session token, add that as a header
    if(app.config.sessionToken){
        xhr.setRequestHeader('token',app.config.sessionToken.id)
    }
    //when the request comes back, handle the response
    xhr.onreadystatechange = function(){
        if(xhr.readyState == XMLHttpRequest.DONE){
            const statusCode = xhr.status
            const responseReturned = xhr.responseText
            //callback if requested
            if(callback){
                try {
                    const parsedResponse = JSON.parse(responseReturned)
                    callback(statusCode, parsedResponse)
                } catch (e) {
                    callback(statusCode,false)
                }
            }
        }
    }
    const payloadString =  JSON.stringify(payload)
    xhr.send(payloadString)
}