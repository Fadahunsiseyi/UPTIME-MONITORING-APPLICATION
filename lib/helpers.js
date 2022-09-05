/*
Helpers for various tasks
*/

//Dependencies

const crypto = require('crypto');



//Container for all the helpers
const helpers = {}

//Create a sha256 hash
helpers.hash = (str) => {
    if(typeof(str) === 'string' && str.length > 0){
        const hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
    }
    else {
        return false;
    }
}



module.exports = helpers;