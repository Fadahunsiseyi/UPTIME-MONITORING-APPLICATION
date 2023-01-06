


const dgram = require('dgram');

const client = dgram.createSocket('udp4')

const msgStr = 'This is a message'

const msgBuffer = Buffer.from(msgStr)


client.send(msgBuffer,6000,'localhost',(err)=>{
    client.close()
})