

const dgram = require('dgram');

const server = dgram.createSocket('udp4')


server.on('message',(msgBuffer,sender)=>{
    const msgString = msgBuffer.toString()
    console.log(msgString)
})

server.bind(6000)