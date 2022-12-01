/*
Helpers for various tasks
*/

//Dependencies

const crypto = require('crypto');
const querystring = require('querystring');
const https = require('https');
const config = require('./config')
const path = require('path');
const fs = require('fs');



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

//Send an SMS via twilio API

helpers.sendTwilioSms = (phone,msg,callback)=> {
    //Validate the parameters
  phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
  msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim() : false;
  if(phone && msg) {
    //Configure the request payload
    const payload = {
        'From': config.twilio.fromPhone,
        'To': '+1'+phone,
        'Body': msg
    }
    //Stringify the request payload
    const stringPayload = querystring.stringify(payload);

    //Configure the request details
    const requestDetails = {
        'protocol': 'https:',
        'hostname': 'api.twilio.com',
        'method': 'POST',
        'path': '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
        'auth': config.twilio.accountSid+':'+config.twilio.authToken,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(stringPayload)
        }
    }
    //Instantiate https request
    const req = https.request(requestDetails,(res) => {
        //Grab the status of thee sent request
        const status = res.statusCode;
        //Callback successfully if the request went through
        if(status == 200 || status == 201){
            callback(false)
        }
        else {
            callback('Status code returned was '+status)
        }
    })
    //Bind the error event so it doens't get thrown
    req.on('error', (e) =>{
        callback(e)
    });
    //Add the payload
    req.write(stringPayload);
    //End the request
    req.end()
  }
  else {
    callback('Given parameters are not valid');
  }
}

//Get the string content of a template

helpers.getTemplate = (templateName, data, callback) =>{
    console.log(templateName,data,'in line 119 in the helpers file')
    templateName = typeof templateName == 'string' && templateName.length > 0 ? templateName : false;
    data = typeof data == 'object' && data !== null ? data : ''
    if(templateName){
        const templatesDir = path.join(__dirname,'/../templates/')
        fs.readFile(templatesDir+templateName+'.html','utf-8',(err,str)=>{
            console.log(err,str,'line 125 in the helpers file')
            if(!err && str && str.length > 0){
                //Fo interpolattion on the string
                const finalString = helpers.interpolate(str,data)
                console.log(finalString,'final string on line 128!!!',str,data)
                callback(false,finalString)
            } else {
                callback('No template found')
            }
        })
    }
    else {
        callback('A valid template name was not specified')
    }
}

//Add the universal header and footter to a string

helpers.addUniversalTemplates = (str,data,callback) => {
    console.log(str,data,'i am the string and data!!!!!!! line 141')
    str = typeof str == 'string' && str.length > 0 ? str : ''
    console.log(str,'i am the str!!!!!!! line 143')
    data = typeof data == 'object' && data !== null ? data : ''
    console.log(data,'i am the data!!!!!!! line 145')
    //Get the header
    helpers.getTemplate('_header',data,(err,headerString)=>{
        console.log(data,err,headerString,'the header string in helpers line 151')
        if(!err && headerString){
            //Get the footer
            helpers.getTemplate('_footer',data,(err,footerString)=>{
                console.log(data,err,footerString,'the header string in helpers line 151')
                if(!err && footerString){
                    //Add them all together
                    const fullString = headerString+str+footerString
                    callback(false,fullString)
                }
                else {
                    callback('Could not find footer in template')
                }
            })
        }
        else {
            callback('Could not find the header in the template')
        }
    })
}


//Take a string and a data object and find/replace all the key within it

helpers.interpolate = (str,data) =>{
    console.log(str,data,'i am the string and data!!!!!!! line 152')
    str = typeof str == 'string' && str.length > 0 ? str : ''
    console.log(str,'i am the str!!!!!!! line 154')
    data = typeof data == 'object' && data !== null ? data : ''
    console.log(data,'i am the data!!!!!!! line 156')

    //Add the templateGlobals do the data object,prepending their key name with globals
    for(let keyName in config.templateGlobals){
        if(config.templateGlobals.hasOwnProperty(keyName)){
            data['global.'+keyName] = config.templateGlobals[keyName]
        }
    }
    //forEach key in the dataobject, insert its value into the string at the corresponding placeholder
    for(let key in data){
        if(data.hasOwnProperty(key) && typeof data[key] == 'string'){
            const replace = data[key]
            console.log(replace,'i am the replace!!!!!!!')
            const find = '{'+key+'}';
            console.log(find,'i am the find!!!!!!!')
            str = str.replace(find,replace)
            console.log(str,'i am the newwww str!!!!!!!')
        }
    }
    return str
}



module.exports = helpers;