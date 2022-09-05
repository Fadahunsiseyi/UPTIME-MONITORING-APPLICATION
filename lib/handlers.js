const handlers = {};

handlers.ping = (data, callback) => {
  callback(200);
};

handlers.users = (data, callback) => {
    const acceptableMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if(acceptableMethods.indexOf(data.method) !== -1) {
        handlers._users[data.method](data, callback);
    }
}

// Containers for all user submethods
handlers._users = {}

// Users - GET
handlers._users.get = (data, callback) => {
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 11 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true: false;

    if(firstName && lastName && phone && password && tosAgreement) {}
    else {
        callback(400, {'Error' : 'Missing required fields'})
    }
}


// Users - POST
handlers._users.post = (data, callback) => {}


// Users - PUT
handlers._users.put = (data, callback) => {}


// Users - DELETE
handlers._users.delete = (data, callback) => {}


handlers.notFound = (data, callback) => {
  callback(404);
};

module.exports = handlers