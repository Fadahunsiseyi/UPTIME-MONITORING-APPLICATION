/*
Helpers for various tasks
*/

//Dependencies

const crypto = require('crypto');
const config = require('./config')



//Container for all the helpers
const helpers = {}

//Create a sha256 hash
helpers.hash = (str) => {
    if(typeof(str) === 'string' && str.length > 0){
        const hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
        return hash;
    }
    else {
        return false;
    }
}

//Parse a Json string to an object in all cases, without throwing an exception

helpers.parseJsonToObject = (str) => {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (error) {
        return {}
    }
}

//Create a string of random alphanumeric characters of a given length
helpers.createRandomString = (strLength) => {
    strLength = typeof (strLength) == 'number' && strLength > 0 ? strLength : false;
    if(strLength) {
        //Define all possible characters that can go into a string
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        //Start the final string
        let str = '';
        for(let i = 1; i <= strLength; i++) {
            let randomChar = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            console.log(randomChar,'line 47 in helpers');
            str+=randomChar;
        }
        return str;

    }
    else {
        return false;
    }
}



module.exports = helpers;