

const path = require('path');
const fs = require('fs');
const _data = require('./data');
const https = require('https');
const http = require('http');
const helpers = require('./helpers');
const url = require('url');
const { type } = require('os');


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
    originalCheckData.userPhone = typeof(originalCheckData.userPhone) == 'string' && originalCheckData.userPhone.trim().length == 11 ? originalCheckData.userPhone.trim() : false;
    originalCheckData.protocol = typeof(originalCheckData.protocol) == 'string' && ['http','https'].indexOf(originalCheckData.protocol) > -1 ? originalCheckData.protocol.trim() : false;
    originalCheckData.userPhone = typeof(originalCheckData.userPhone) == 'string' && originalCheckData.userPhone.trim().length == 11 ? originalCheckData.userPhone.trim() : false;

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