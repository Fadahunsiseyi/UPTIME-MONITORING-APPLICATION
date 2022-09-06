
//Dependencies

const _data = require('./data')
const helpers = require('./helpers')


//Define the handlers
const handlers = {};

// handlers.ping = (data, callback) => {
//   callback(200);
// };

handlers.users = (data, callback) => {
    const acceptableMethods = ['post', 'get', 'put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
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
    const phone = typeof(data.queryStringObject.phone) === 'string' && data.queryStringObject.phone.trim().length == 11 ? data.queryStringObject.phone.trim() : false;
    if(phone){
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
        callback(400,{'Error' : 'Missing required fields'});
    }
}


// Users - PUT
handlers._users.put = (data, callback) => {}


// Users - DELETE
handlers._users.delete = (data, callback) => {}


handlers.notFound = (data, callback) => {
  callback(404);
};

module.exports = handlers