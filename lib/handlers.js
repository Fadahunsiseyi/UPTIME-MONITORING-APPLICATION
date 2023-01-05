
//Dependencies

const config = require('./config');
const _data = require('./data')
const helpers = require('./helpers')
const _url = require('url')
const dns = require('dns')
const _performance = require('perf_hooks').performance;
const util = require('util')
const debug = util.debuglog('performance')


//Define the handlers
const handlers = {};

/*
HTML Handlers
*/


/*
Index handlers
*/

handlers.index = (data,callback)=>{
    if(data.method == 'get'){
        //Prepare data for interpolation
        const templateData = {
            'head.title': 'Uptime Monitoring Application',
            'head.description': 'We offer free, simple uptime monitoring for HTTP sites',
            'body.class': 'index'
        }


        //Read in a template as a string
        helpers.getTemplate('index',templateData,(err,str)=>{
            console.log(templateData,err,str,'line 34 in the handlers file')
            if(!err && str){
                // callback(200,str,'html')
                //Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html')
                    } else {
                        callback(500,undefined,'html')
                    }
                })
            } else {
                callback(500,undefined,'html')
            }
        })
    }
    else{
        callback(405,undefined,'html')
    }
}

//Create Account

handlers.accountCreate = (data,callback) =>{
    if(data.method == 'get'){
        //Prepare data for interpolation
        const templateData = {
            'head.title': 'Create an Account',
            'head.description': 'Signup is easy, and only takes a few seconds.',
            'body.class': 'accountCreate'
        }


        //Read in a template as a string
        helpers.getTemplate('accountCreate',templateData,(err,str)=>{
            console.log(templateData,err,str,'line 34 in the handlers file')
            if(!err && str){
                // callback(200,str,'html')
                //Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html')
                    } else {
                        callback(500,undefined,'html')
                    }
                })
            } else {
                callback(500,undefined,'html')
            }
        })
    }
    else{
        callback(405,undefined,'html')
    }
}


//Create Session

handlers.sessionCreate = (data,callback) =>{
    if(data.method == 'get'){
        //Prepare data for interpolation
        const templateData = {
            'head.title': 'Login to your account',
            'head.description': 'Please enter your phone number and password',
            'body.class': 'sessionCreate'
        }


        //Read in a template as a string
        helpers.getTemplate('sessionCreate',templateData,(err,str)=>{
            console.log(templateData,err,str,'line 34 in the handlers file')
            if(!err && str){
                // callback(200,str,'html')
                //Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html')
                    } else {
                        callback(500,undefined,'html')
                    }
                })
            } else {
                callback(500,undefined,'html')
            }
        })
    }
    else{
        callback(405,undefined,'html')
    }
}


//Sesssion has been deleted
handlers.sessionDeleted = (data,callback) =>{
    if(data.method == 'get'){
        //Prepare data for interpolation
        const templateData = {
            'head.title': 'Logged Out',
            'head.description': 'You have been logged out of your account',
            'body.class': 'sessionDeleted'
        }


        //Read in a template as a string
        helpers.getTemplate('sessionDeleted',templateData,(err,str)=>{
            if(!err && str){
                // callback(200,str,'html')
                //Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html')
                    } else {
                        callback(500,undefined,'html')
                    }
                })
            } else {
                callback(500,undefined,'html')
            }
        })
    }
    else{
        callback(405,undefined,'html')
    }
}


//Edit your account
handlers.accountEdit = (data,callback) =>{
    if(data.method == 'get'){
        //Prepare data for interpolation
        const templateData = {
            'head.title': 'Account Settings',
            'body.class': 'accountEdit'
        }


        //Read in a template as a string
        helpers.getTemplate('accountEdit',templateData,(err,str)=>{
            if(!err && str){
                // callback(200,str,'html')
                //Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html')
                    } else {
                        callback(500,undefined,'html')
                    }
                })
            } else {
                callback(500,undefined,'html')
            }
        })
    }
    else{
        callback(405,undefined,'html')
    }
}



//Delete your account
handlers.accountDeleted = (data,callback) =>{
    if(data.method == 'get'){
        //Prepare data for interpolation
        const templateData = {
            'head.title': 'Account Deleted',
            'head.description': 'Your account has been deleted',
            'body.class': 'accountDeleted'
        }


        //Read in a template as a string
        helpers.getTemplate('accountDeleted',templateData,(err,str)=>{
            if(!err && str){
                // callback(200,str,'html')
                //Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html')
                    } else {
                        callback(500,undefined,'html')
                    }
                })
            } else {
                callback(500,undefined,'html')
            }
        })
    }
    else{
        callback(405,undefined,'html')
    }
}


//Create a new check
handlers.checksCreate = (data,callback) =>{
    if(data.method == 'get'){
        //Prepare data for interpolation
        const templateData = {
            'head.title': 'Create a New Check',
            'body.class': 'checksCreate'
        }


        //Read in a template as a string
        helpers.getTemplate('checksCreate',templateData,(err,str)=>{
            if(!err && str){
                // callback(200,str,'html')
                //Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html')
                    } else {
                        callback(500,undefined,'html')
                    }
                })
            } else {
                callback(500,undefined,'html')
            }
        })
    }
    else{
        callback(405,undefined,'html')
    }
}


//Dashboard
handlers.checksList = (data,callback) =>{
    if(data.method == 'get'){
        //Prepare data for interpolation
        const templateData = {
            'head.title': 'Dashboard',
            'body.class': 'checksList'
        }


        //Read in a template as a string
        helpers.getTemplate('checksList',templateData,(err,str)=>{
            if(!err && str){
                // callback(200,str,'html')
                //Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html')
                    } else {
                        callback(500,undefined,'html')
                    }
                })
            } else {
                callback(500,undefined,'html')
            }
        })
    }
    else{
        callback(405,undefined,'html')
    }
}


//Edit a check
handlers.checksEdit = (data,callback) =>{
    if(data.method == 'get'){
        //Prepare data for interpolation
        const templateData = {
            'head.title': 'Check Details',
            'body.class': 'checksEdit'
        }


        //Read in a template as a string
        helpers.getTemplate('checksEdit',templateData,(err,str)=>{
            if(!err && str){
                // callback(200,str,'html')
                //Add the universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html')
                    } else {
                        callback(500,undefined,'html')
                    }
                })
            } else {
                callback(500,undefined,'html')
            }
        })
    }
    else{
        callback(405,undefined,'html')
    }
}


//FAVICON

handlers.favicon = (data,callback)=>{
    if(data.method == 'get'){
        //Read in the favicon data
        helpers.getStaticAsset('favicon.ico',(err,data)=>{
            if(!err && data){
                callback(200,data,'favicon')
            }
            else{
                callback(500)
            }
        })
    }
    else{
        callback(405)
    }
}

//PUBLIC ASSETS
handlers.public = (data,callback)=>{
    if(data.method == 'get'){
        //Get the file name being requested
        const trimmedAssetName = data.trimmedPath.replace('public/','').trim()
        if(trimmedAssetName.length > 0){
            helpers.getStaticAsset(trimmedAssetName,(err,data)=>{
                console.log(err,'first,wait...',data,'second!!!!!.......')
                if(!err && data){
                    //Determine the content type
                    let contentType = 'plain'
                    if(trimmedAssetName.indexOf('.css') > -1){
                        contentType = 'css'
                    }
                    if(trimmedAssetName.indexOf('.png') > -1){
                        contentType = 'png'
                    }
                    if(trimmedAssetName.indexOf('.jpg') > -1){
                        contentType = 'jpg'
                    }
                    if(trimmedAssetName.indexOf('.ico') > -1){
                        contentType = 'favicon'
                    }
                    callback(200,data,contentType)
                }
                else {
                    callback(404)
                }
            })
        }
        else{
            callback(404)
        }
    }
    else{
        callback(405)
    }
}


/*
JSON API Handlers
*/

handlers.ping = (data, callback) => {
  callback(200);
};

//Exampleerror

handlers.exampleError = (data, callback) => {
    const err = new Error('This is an example error')
    throw(err)
}

handlers.users = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405)
    }
}

// Containers for all user submethods
handlers._users = {}

// Users - POST
handlers._users.post = (data, callback) => {
    console.log(data,'line 27')
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 11 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true: false;

    if(firstName && lastName && phone && password && tosAgreement) {
        //Make sure the user does not exist already
        _data.read('users',phone,(err,data) => {
            if(err) {
                // Hash the password
                const hashedPassword = helpers.hash(password);
                if(hashedPassword) {
                           //Create the new user
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    hashedPassword,
                    tosAgreement,
                }

                //Store the user
                _data.create('users',phone,userObject,(err) => {
                    if(!err) {
                        callback(200)
                    }
                    else {
                        console.log(err)
                        callback(500,{'Error': 'Could not create new user'})
                    }
                })
                }
                else {
                    callback(500,{'Error': 'Could not hash user\'s password'})
                }
            }
            else {
                callback(400, {'Error': 'A user with that phone number already exists'})
            }
        })
    }
    else {
        callback(400, {'Error' : 'Missing required fields'})
    }
}


// Users - GET
// Only authenticated users are allowed to access their objects...
handlers._users.get = (data, callback) => {
    const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 11 ? data.queryStringObject.phone.trim() : false;
    if(phone){
    //Get the token from the headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    //Verify that the token is valid for the phone number
    handlers._tokens.verifyToken(token,phone,(tokenIsValid) => {
        if(tokenIsValid) {
        _data.read('users',phone,(err,data) => {
            if(!err && data) {
           //Remove hashed password before returning it
           delete data.hashedPassword;
           callback(200,data)
            }
            else {
                callback(404)
            }
        })
        }
        else {
            callback(403,{'Error': 'Missing required token in header, or token is not valid'});
        }
    })
    }
    else {
        callback(400,{'Error' : 'Missing required fields'});
    }
}


// Users - PUT
handlers._users.put = (data, callback) => {
    //required field
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 11 ? data.payload.phone.trim() : false;
    // Optional fields
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    if(phone){
        if(firstName || lastName || password) {
        //Get the token from the headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        handlers._tokens.verifyToken(token,phone,(tokenIsValid) => {
        if(tokenIsValid) {
                        //Lookup the user
                        _data.read('users',phone,(err,userData)=> {
                            if(!err && userData) {
                                if(firstName) {
                                    userData.firstName = firstName;
                                }
                                if(lastName) {
                                    userData.lastName = lastName;
                                }
                                if(password) {
                                    userData.hashedPassword = helpers.hash(password);
                                }
                                //Store the new upddate
                                _data.update('users',phone,userData,(err) => {
                                    if(!err) {
                                        callback(200)
                                    }
                                    else {
                                        console.log(err)
                                        callback(500,{'Errror': 'Could not update user'});
                                    }
                                });
                            }
                            else {
                                callback(400,{'Error': 'The specified user does not exist'});
                            }
                        })
        } else {
            callback(403,{'Error': 'Missing required token in header, or token is not valid'});
        }
        })
        }
        else {
            callback(400,{'Error': 'Missing fields to update'})
        }
    }
    else {
        callback(400,{'Error': 'Missing required fields'})
    }
}


// Users - DELETE
handlers._users.delete = (data, callback) => {
    // Check that the number is valid
    const phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 11 ? data.queryStringObject.phone.trim() : false;
    if(phone){
          //Get the token from the headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    handlers._tokens.verifyToken(token,phone,(tokenIsValid) => {
    if(tokenIsValid) {
        _data.read('users',phone,(err,userData) => {
            if(!err && userData) {
            _data.delete('users',phone,(err) => {
                if(!err) {
                    //Delete each of the checks associated with the user
                    const userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                    const checksToDelete = userChecks.length;
                    if(checksToDelete > 0) {
                        let checksDeleted = 0;
                        let deletionError = false;
                        //Loop through the checks to delete
                        userChecks.forEach((userId) => {
                            _data.delete('checks',userId,(err) => {
                                if(err){
                                    deletionError = true;
                                }
                                checksDeleted++
                                if(checksDeleted == checksToDelete) {
                                    if(!deletionError) {
                                        callback(200)
                                    }else {
                                        callback(500,{'Error':'Error is encountered while attempting to delete all of the users checks. All checks may not have been deleted from the user successfully'})
                                    }
                                }
                            })
                        })
                    }
                    else {
                        callback(200)
                    }
                } else {
                    callback(500,{'Error': 'Could not delete the specified user'})
                }
            })
            }
            else {
                callback(404,{'Error': 'Could not find the specified user'})
            }
        })
    }
    else {
        callback(403,{'Error': 'Missing required token in header, or token is not valid'});
    }
})
    }
    else {
        callback(400,{'Error' : 'Missing required fields'});
    }
}


// TOKENS
handlers.tokens = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._tokens[data.method](data, callback);
    }
}
//Container for all tokens methods
handlers._tokens = {};


//TOKENS - POST
handlers._tokens.post = (data,callback) => {
    _performance.mark('entered function')
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 11 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    _performance.mark('inputs validated')
    if(phone && password) {
        //Lookup the user who matches that phone number
        _performance.mark('beginning user lookup')
        _data.read('users',phone,(err,userData) => {
            _performance.mark('user lookup complete')
            if(!err && userData) {
                _performance.mark('beginning password hashing')
                const hashedPassword = helpers.hash(password)
                _performance.mark('completed password hashing')
                if(hashedPassword == userData.hashedPassword) {
                    //If valid, create a new token, set expiration date to 1 hour
                    _performance.mark('creating data for the token')
                    const tokenId = helpers.createRandomString(20);
                    const expires = Date.now() + 1000 * 60 * 60;
                    const tokenObject = {
                        'phone':phone,
                        'id':tokenId,
                        'expires': expires
                    }
                    // Store the token object
                    _performance.mark('begin to store token')
                    _data.create('tokens',tokenId, tokenObject,(err) => {
                        _performance.mark('storing token complete')

                        //Gather all the measurements
                        _performance.measure('Beginning to end','entered function','storing token complete')
                        _performance.measure('Validating user input','entered function','inputs validated')
                        _performance.measure('User lookup','beginning user lookup','user lookup complete')
                        _performance.measure('Password hashing','beginning password hashing','completed password hashing')
                        _performance.measure('Token data creation','creating data for the token','begin to store token')
                        _performance.measure('Token storing','begin to store token','storing token complete')

                        

                        if(!err) {
                            callback(200,tokenObject)
                        } else {
                            callback(500,{'Error': 'Could not create new token'})
                        }
                    })
                }
                else {
                    callback(400,{'Error': 'Password did not match the specified user\'s password'})
                }
            }
            else {
                callback(400,{'Error': 'Could not find the specified user'})
            }
        })
    }
    else {
        callback(400,{'Error': 'Missing required field'})
    }
}

//TOKENS - GET
handlers._tokens.get = (data,callback) => {
    const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    if(id){
        _data.read('tokens',id,(err,tokenData) => {
            if(!err && tokenData) {
           callback(200,tokenData)
            }
            else {
                callback(404)
            }
        })
    }
    else {
        callback(400,{'Error' : 'Missing required fields'});
    }
}

//TOKENS - PUT
handlers._tokens.put = (data,callback) => {
    const id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
    const extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
    if(id && extend) {
        _data.read('tokens',id,(err,tokenData) => {
            if(!err && tokenData) {
                if(tokenData.expires > Date.now()) {
                    //Set the expiration to 1 hour from now.
                    tokenData.expires = Date.now() + 1000 * 60 * 60;
                    //Store the new updates
                    _data.update('tokens',id,tokenData,(err) => {
                        if(!err){
                            callback(200)
                        } else {
                            callback(500,{'Error':'Could not udate the tokens expiration'})
                        }
                    })
                }
                else {
                    callback(400,{'Error':'The token has expired, and cannot be extented'})
                }
            }
            else {
                callback(400,{'Error': 'Specified token does not exist'})
            }
        })
    }else {
    callback(400,{'Error': 'Missing required field(s), or field(s) are invalid'})
    }
}

//TOKENS - DELETE
handlers._tokens.delete = (data,callback) => {
 // Check that the number is valid
 const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
 if(id){
     _data.read('tokens',id,(err,data) => {
         if(!err && data) {
         _data.delete('tokens',id,(err) => {
             if(!err) {
                 callback(200)
             } else {
                 callback(500,{'Error': 'Could not delete the specified user'})
             }
         })
         }
         else {
             callback(404,{'Error': 'Could not find the specified user'})
         }
     })
 }
 else {
     callback(400,{'Error' : 'Missing required fields'});
 }}

//Verify if a token id is currently valid for a given user

handlers._tokens.verifyToken = (id,phone,callback) => {
    _data.read('tokens',id,(err,tokenData)=> {
        console.log(err,tokenData,'line 329');
        if(!err && tokenData) {
            //Check that the token is for the given user, and has not expired
            if(tokenData.phone == phone && tokenData.expires > Date.now()){
                callback(true)
            } else {
                callback(false)
            }
        }
        else {
            callback(false)
        }
    })
}


handlers.checks = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._checks[data.method](data, callback);
    }
}

handlers._checks = {}


handlers._checks.post = (data,callback) => {
    const protocol = typeof(data.payload.protocol) == 'string' && ['http','https'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > -1 ? data.payload.url : false;
    const method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

    if(protocol && url && method && successCodes && timeoutSeconds){
        //Get the token from the headers
        const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        //Lookup the user by reading the token
        _data.read('tokens',token,(err,tokenData)=> {
            if(!err && tokenData){
                const userPhone = tokenData.phone
                //Lookup the user data
            _data.read('users',userPhone,(err,userData) => {
                console.log(userData,'in the handlers on line 372')
                if(!err && userData){
                    const userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                    //Verify that the user has the max checks
                    if(userChecks.length < config.maxChecks){
                        const parsedUrl = _url.parse(protocol+'://'+url,true)
                        const hostName = typeof(parsedUrl.hostname) == 'string' && parsedUrl.hostname.length > 0 ? parsedUrl.hostname : false;
                        dns.resolve(hostName,(err,records)=>{
                            if(!err && records){
                                                        //Create a random id for the check
                        const checkId = helpers.createRandomString(20)
                        //Create the check object, and include the users phone
                        const checkObject = {
                            'id': checkId,
                            userPhone,
                            protocol,
                            url,
                            method,
                            successCodes,
                            timeoutSeconds
                        }
                        //Store data on the checks directory
                        _data.create('checks',checkId,checkObject,(err) => {
                            if(!err){
                                //Add the checks Id to the users data
                                userData.checks = userChecks;
                                userData.checks.push(checkId)
                                // Save the new user data
                                _data.update('users',userPhone,userData,(err) => {
                                    if(!err){
                                        callback(200,checkObject)
                                    }
                                    else {
                                        callback(500,{'Error': 'Could not update the user with the new check'})
                                    }
                                })
                            }
                            else{
                                callback(500,{  'Error': 'Could not create the new check'})
                            }
                        })
                            }
                            else {
                                callback(400,{'Error': 'The hostname of the URL entered did not resolve to any DNS enteries'})
                            }
                        })
                    }
                    else {
                        callback(400,{'Error': 'The user already has the maximum number of checks ('+config.maxChecks+')'})
                    }
                }
                else{
                    callback(403)
                }
            })    
            }
            else {
                callback(403)
            }
        })
    }
    else {
        callback(400,{'Error': 'Missing required inputs, or inputs are invalid'})
    }
}



//CHECKS - GET

handlers._checks.get = (data, callback) => {
    const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    if(id){
      //Look up the check
      _data.read('checks',id,(err,checkData) => {
        if(!err && checkData){
              //Get the token from the headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    //Verify that the token is valid for the phone number
    handlers._tokens.verifyToken(token,checkData.userPhone,(tokenIsValid) => {
        if(tokenIsValid) {
      //Return thhe check data
      callback(200,checkData)
        }
        else {
            callback(403,{'Error': 'Missing required token in header, or token is not valid'});
        }
    })
        }
        else {
            callback(404)
        }
      })
    }
    else {
        callback(400,{'Error' : 'Missing required fields'});
    }
}



// CHECKS - PUT

handlers._checks.put = (data,callback) => {
    //Required field
    const id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
    // Optional fields
    const protocol = typeof(data.payload.protocol) == 'string' && ['http','https'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    const url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > -1 ? data.payload.url : false;
    const method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    const successCodes = typeof(data.payload.successCodes) == 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
    const timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;
    //Check to make sure id is valid
    if(id){
        //Check to make sure one or more optional fields has been sent
        if(protocol || url || method || successCodes || timeoutSeconds){
            //Lookup the user
            _data.read('checks',id,(err,checkData) => {
                if(!err && checkData){
                    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
                     //Verify that the token is valid for the phone number
    handlers._tokens.verifyToken(token,checkData.userPhone,(tokenIsValid) => {
        if(tokenIsValid) {
            //Update the check where necessary
             if(protocol){
                checkData.protocol = protocol;
             }
             if(url){
                checkData.url = url;
             }
             if(method){
                checkData.method = method;
             }
             if(successCodes){
                checkData.successCodes = successCodes;
             }
             if(timeoutSeconds){
                checkData.timeoutSeconds = timeoutSeconds;
             }
             //Store the new updates
             _data.update('checks',id,checkData,(err) =>{
                if(!err){
                    callback(200)
                }
                else {
                    callback(500,{'Error': 'Could not update the check'})
                }
             })
              }
              else {
                  callback(403,{'Error': 'Missing required token in header, or token is not valid'});
              }
    })
                }
                else {
                    callback(400,{'Error': 'Check Id did not exist'})
                }
            })
        }
        else {
            callback(400,{'Error': 'Missing fields to update'})
        }
    }
    else {
        callback(400,{'Error': 'Missing required fields'})
    }
}



// CHECKS - DELETE


handlers._checks.delete = (data, callback) => {
    // Check that the number is valid
    const id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    if(id){
        //Lookup the check to be deleted
        _data.read('checks',id,(err,checkData) => {
            if(!err && checkData){
                          //Get the token from the headers
    const token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    handlers._tokens.verifyToken(token,checkData.userPhone,(tokenIsValid) => {
    if(tokenIsValid) {
        //Delete the checkData
        _data.delete('checks',id,(err) => {
            if(!err){
                _data.read('users',checkData.userPhone,(err,userData) => {
                    if(!err && userData) {
                        const userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                        //Remove the deleted check from the list of checks
                        const checkPosition = userChecks.indexOf(id)
                        if(checkPosition > -1){
                            userChecks.splice(checkPosition,1)
                            //Re save user\'s data
                            _data.update('users',checkData.userPhone,userData,(err) => {
                                if(!err) {
                                    callback(200)
                                } else {
                                    callback(500,{'Error': 'Could not update the specified user'})
                                }
                            })
                        }
                        else {
                            callback(500,{'Error': 'Could not find the check on the user object, so could not remove it'})
                        }
                    }
                    else {
                        callback(500,{'Error': 'Could not find the user who created the check, so could not remove the checks'})
                    }
                })
            }
            else {
                callback(500,{'Error':'Could not delete the check data'})
            }
        })
    }
    else {
        callback(403,{'Error': 'Missing required token in header, or token is not valid'});
    }
})
            }
            else {
                callback(400,{'Error': 'Specified check id does not exist'})
            }
        })
    }
    else {
        callback(400,{'Error' : 'Missing required fields'});
    }
}


handlers.notFound = (data, callback) => {
  callback(404);
};

module.exports = handlers