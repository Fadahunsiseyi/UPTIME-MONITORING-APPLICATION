

const net = require('net')
const outboundMessage = 'ping'

const client = net.createConnection({'port':6000},()=>{
     //Send the message
     client.write(outboundMessage)
})

client.on('data',(inboundMessage)=>{
    const msgStr = inboundMessage.toString()
    console.log('I wrote',outboundMessage,'and they said', msgStr)
})