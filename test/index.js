

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





_app.runTests()