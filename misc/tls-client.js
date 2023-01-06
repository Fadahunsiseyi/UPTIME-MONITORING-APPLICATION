


const tls = require('tls');
const fs = require('fs')
const path = require('path');

const options = {
    ca: fs.readFileSync(path.join(__dirname,'/../https/cert.pem')),
}


const outboundMessage = 'ping'

const client = tls.connect(6000,options,()=>{
     //Send the message
     client.write(outboundMessage)
})

client.on('data',(inboundMessage)=>{
    const msgStr = inboundMessage.toString()
    console.log('I wrote',outboundMessage,'and they said', msgStr)
})