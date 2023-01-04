
const app = require('./../index')
const assert = require('assert')
const http = require('http')
const config = require('./../lib/config')




const api = {}


const helpers = {}


helpers.makeGetRequest = (path,callback) =>{
    //Configure the request details
    const requestDetails = {
        'protocol': 'http:',
        'hostname' : 'localhost',
        'port' : config.httpPort,
        'method': 'GET',
        'path' : path,
        'headers' : {
            'Content-Type': 'application/json'
        }
    }
    //send the request
    const req = http.request(requestDetails,(res)=>{
        callback(res)
    })
    req.end()
}

//The main init function should be able to run without throwing exceptions

api['app.init should start without throwing exceptions'] = (done) => {
    assert.doesNotThrow(()=>{
        app.init((err)=>{
            done()
        })
    },TypeError)
}

//Make a request to /ping

api['/ping should respond to GET with 200'] = (done) => {
    helpers.makeGetRequest('/ping',(res) =>{
        assert.equal(res.statusCode, 200)
        done()
    })
}

//Make a request to /Api.users
api['/api/users should respond to GET with 400'] = (done) => {
    helpers.makeGetRequest('/api/users',(res) =>{
        assert.equal(res.statusCode, 400)
        done()
    })
}

//Make a request to random path
api['random path should respond to GET with 404'] = (done) => {
    helpers.makeGetRequest('/this/path/shouldnt/exist',(res) =>{
        assert.equal(res.statusCode, 404)
        done()
    })
}



module.exports = api