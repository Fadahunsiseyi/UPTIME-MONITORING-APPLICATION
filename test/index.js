

const helpers = require('./../lib/helpers')
const assert = require('assert')
const app = require('../index-debug')


//Application for the test runner

_app ={}


//Container for the tests

_app.tests = {
    'unit' : {}
}

_app.tests.unit['helpers.getANumber should return 1'] = (done)=>{
    const val = helpers.getANumber()
    assert.equal(val, 1)
    done()
}

_app.tests.unit['helpers.getANumber should return number'] = (done)=>{
    const val = helpers.getANumber()
    assert.equal(typeof(val), 'number')
    done()
}

_app.tests.unit['helpers.getANumber should return 2'] = (done)=>{
    const val = helpers.getANumber()
    assert.equal(val, 2)
    done()
}

// _app.countTests = () =>{
//     let counter = 0
//     for(let key in _app.tests){
//         if(_app.tests.hasOwnProperty(key)){
//             const subTests = _app.tests[key]
//             for(let testName in subTests){
//                 if(subTests.hasOwnProperty(testName)){
//                     counter += 1
//                 }
//             }
//         }
//     }
//     return counter
// }





_app.runTests()