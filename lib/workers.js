

const path = require('path');
const fs = require('fs');
const _data = require('./data');
const https = require('https');
const http = require('http');
const helpers = require('./helpers');
const url = require('url');
const _logs = require('./logs');


//Instantiate the worker object
const workers = {};

//Lookup all the checks, get their data, and send to a validator

workers.gatherAllChecks = () => {
    //Get all the checks
    _data.list('checks',(err,checks) => {
        if(!err && checks && checks.length > 0) {
            checks.forEach((check) => {
                //Read the check data
                _data.read('checks',check,(err,originalCheckData)=>{
                    if(!err && originalCheckData){
                        //Pass it to the check validator
                        workers.validateCheckData(originalCheckData)
                    }
                    else {
                        console.log('Error reading check data')
                    }
                })
            })
        }
        else {
            console.log('Error : Could not find any check to process')
        }
    })
}

//Sanity checking the check data

workers.validateCheckData = (originalCheckData) => {
    originalCheckData = typeof(originalCheckData) == 'object' && originalCheckData !== null ? originalCheckData : {};
    originalCheckData.id = typeof(originalCheckData.id) == 'string' && originalCheckData.id.trim().length == 20 ? originalCheckData.id.trim() : false;
    originalCheckData.userPhone = typeof(originalCheckData.userPhone) == 'string' && originalCheckData.userPhone.trim().length >= 10 ? originalCheckData.userPhone.trim() : false;
    originalCheckData.protocol = typeof(originalCheckData.protocol) == 'string' && ['http','https'].indexOf(originalCheckData.protocol) > -1 ? originalCheckData.protocol.trim() : false;
    originalCheckData.url = typeof(originalCheckData.url) == 'string' && originalCheckData.url.trim().length > 0 ? originalCheckData.url.trim() : false;
    originalCheckData.method = typeof(originalCheckData.method) == 'string' && ['post','get','put','delete'].indexOf(originalCheckData.method) > -1 ? originalCheckData.method : false;
    originalCheckData.successCodes = typeof(originalCheckData.successCodes) == 'object' && originalCheckData.successCodes instanceof Array && originalCheckData.successCodes.length > 0 ? originalCheckData.successCodes : false;
    originalCheckData.timeoutSeconds = typeof(originalCheckData.timeoutSeconds) == 'number' && originalCheckData.timeoutSeconds % 1 === 0 && originalCheckData.timeoutSeconds >= 1 && originalCheckData.timeoutSeconds <= 5  ? originalCheckData.timeoutSeconds : false;

    const listAllChecks = originalCheckData.id &&
     originalCheckData.userPhone &&
      originalCheckData.protocol &&
       originalCheckData.url &&
        originalCheckData.method &&
         originalCheckData.timeoutSeconds &&
          originalCheckData.successCodes


    //Set the keys that may not be set (if the workers have never seen this check before)
    originalCheckData.state = typeof(originalCheckData.state) == 'string' && ['up','down'].indexOf(originalCheckData.state) > -1 ? originalCheckData.state : 'down';
    originalCheckData.lastChecked = typeof(originalCheckData.lastChecked) == 'number' && originalCheckData.lastChecked > 0 ? originalCheckData.lastChecked : false;
   // If all the checks pass, pass the data to the next step
    if(listAllChecks){
        workers.performCheck(originalCheckData)
    }
    else {
        console.log('Error: One of the checks is not properly formatted. Skipping it')
    }
}

// Perform the check, send the originalCheckData and the outcome of the check process

workers.performCheck = (originalCheckData) => {
    let checkOutcome = {
        'error': false,
        'responseCode': false
    }

    //Mark that the outcome has not been sent in yet
    let outcomeSent = false;

    //Parse the hostname and path out of the originalCheckData
    const parsedUrl = url.parse(originalCheckData.protocol+'://'+originalCheckData.url,true)
    const hostName = parsedUrl.hostname;
    const path = parsedUrl.path;

    //construct the request
    let requestDetails = {
        'protocol': originalCheckData.protocol+':',
        'hostname': hostName,
        'method': originalCheckData.method.toUpperCase(),
        'path': path,
        'timeout': originalCheckData.timeoutSeconds * 1000
    }

    //Instantiate the request object
    const _moduleToUse = originalCheckData.protocol == 'http' ? http : https;
    const req = _moduleToUse.request(requestDetails,(res) => {
        console.log(res.statusCode,'see the emptt response')
        let status = res.statusCode;
        //Update the checkoutcome, and pass the data along
        checkOutcome.responseCode = status;
        if(!outcomeSent) {
            workers.processCheckOutcome(originalCheckData,checkOutcome)
            outcomeSent = true;
        }
    })
    //Bind to the error event, so it doesn't get thrown
    req.on('error',(e) => {
        //Update the checkoutcome and pass the dat along
        checkOutcome.error = {
            'error': true,
            'value': e
        }
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData,checkOutcome)
            outcomeSent = true;
        }
    })
    //Bind to the timeout event
    req.on('timeout',() => {
        //Update the checkoutcome and pass the dat along
        checkOutcome.error = {
            'error': true,
            'value': 'timeout'
        }
        if(!outcomeSent){
            workers.processCheckOutcome(originalCheckData,checkOutcome)
            outcomeSent = true;
        }
    })
    //End the request
    req.end()
}

//Process the checkoutcomr, and update the check data

workers.processCheckOutcome = (originalCheckData,checkOutcome)=> {
    //Decide if the check is up or down
    const state = !checkOutcome.error && checkOutcome.responseCode && originalCheckData.successCodes.indexOf(checkOutcome.responseCode) > -1 ? 'up' : 'down';
    //Decide if an alert is warranted
    const alertWarranted = originalCheckData.lastChecked && originalCheckData.state !== state ? true : false;

    const timeOfCheck = Date.now()
    workers.log(originalCheckData,checkOutcome,state,alertWarranted,timeOfCheck)

    //Update the check data
    const newCheckData = originalCheckData;
    newCheckData.state = state;
    newCheckData.lastChecked = timeOfCheck

    //Save the updates
    _data.update('checks',newCheckData.id,newCheckData,(err) => {
        if(!err){
            //Send the new check  data to the next phase in the process if needed
            if(alertWarranted){
                workers.alertUserToStatusChange(newCheckData)
            }
            else{
                console.log('Check outcome has not changed, no alert needed')
            }
        }
        else {
            console.log('Error trying to save update to one of the checks')
        }
    })
}

//Alert the user as to a change in the check status

workers.alertUserToStatusChange = (newCheckData)=> {
    const msg = 'Alert: Your check for '+newCheckData.method.toUpperCase()+''+newCheckData.protocol+'://'+newCheckData.url+' is currently '+newCheckData.state+'    '
    helpers.sendTwilioSms(newCheckData.userPhone,msg,(err)=> {
        if(!err){
            console.log('Success: User was alerted to a status change in their check, via sms: ',msg)
        } else {
            console.log('Error could not send  sms alert to user who had a state change in their check')
        }
    })
}

workers.log = (originalCheckData,checkOutcome,state,alertWarranted,timeOfCheck) =>{
    //form the log data
    const logData = {
        'check': originalCheckData,
        'outcome': checkOutcome,
        'state': state,
        'alert': alertWarranted,
        'time': timeOfCheck
    }

    const logString = JSON.stringify(logData)

    //Determine the name of the log file
    const logFileName = originalCheckData.id

    //Append the log string to the file
    _logs.append(logFileName,logString,(err)=>{
        if(!err){
            console.log('Logging to file successed')
        } else {
            console.log('Logging to file failed')
        }
    })
}

//Timer to execute the worker process once per minute
workers.loop = () => {
    setInterval(() =>{
        workers.gatherAllChecks();
    },1000 * 60)
}

//Init script
workers.init = ()=>{
    //Execute all the checks
    workers.gatherAllChecks();
    //Call the loops so the check can be executed later on
    workers.loop()
}




//Export the worker object

module.exports = workers;