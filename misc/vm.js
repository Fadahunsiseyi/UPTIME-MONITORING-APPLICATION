

const vm = require('vm')

const context = {
    'foo': 25
}

const script = new vm.Script(`
   foo = foo * 2
   var bar = foo + 1
   var fizz = 52
`)

script.runInNewContext(context)
console.log(context)